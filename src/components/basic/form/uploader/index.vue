<template>
  <van-field
    readonly
    v-bind="formFieldProps"
    v-on="$listeners"
  >
    <template #input>
      <van-uploader
        multiple
        upload-text="请上传"
        :before-read="beforeRead"
        :after-read="afterRead"
        v-model="currentValue"
        v-bind="fieldProps"
        :disabled="isDisabled"
        :deletable="!isDisabled"
        :show-upload="!isDisabled"
        v-on="events"
        @click-preview="clickPreview"
        @oversize="onOversize"
        @delete="handleDelete"
      >
        <!-- <van-button
          v-if="!onlyPic"
          type="primary"
        >上传文件</van-button> -->
      </van-uploader>
    </template>
  </van-field>
</template>

<script>
import request from '@/utils/request'
import { checkImage, getFileExt, replaceImgUrlByENV } from '@/utils/file'
import { attachmentCheck } from '@/utils/businessCommonUtils'
import nativeApi from '@/utils/nativeApi'

const defaultMaxSize = 10 * 1024 * 1024
const defaultExtensions = 'rar,zip,pdf,png,xls,xlsx,pptx,ppt,txt,doc,docx,bmp,jpg,jpeg,pic,tif'
const deleteBatch = '/attachment/delete'

const COMPONENT_NAME = 'i-uploader'
export default {
  name: COMPONENT_NAME,
  inject: ['form'],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    },
    // 是否启动删除
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentValue: {
      get () {
        // TODOS 回显时，根据部署环境替换图片前缀
        return replaceImgUrlByENV(this.value)
        // return this.value
      },

      set (val) {
        this.$emit('input', val)
      }
    },
    formFieldProps () {
      return this.$attrs
    },
    fieldProps () {
      return this.props
    },
    isDisabled () {
      return this.fieldProps.disabled || (this.form || {}).disabled
    },
    maxCount () {
      return this.fieldProps.maxCount || 6
    },
    maxSize () {
      return this.fieldProps.maxSize || defaultMaxSize
    },
    onlyPic () {
      return this.fieldProps.onlyPic ?? false
    },
    extensions () {
      return this.fieldProps.extensions || defaultExtensions
    },
    extensionList () {
      const { extensions } = this
      if (this.onlyPic) return ['png', 'jpg', 'jpeg']
      if (!extensions) return []
      if (typeof extensions === 'string') return extensions.split(',')
      if (Array.isArray(extensions)) return extensions
      return []
    },
    checkSizeTip () {
      return `文件大小超出${Math.ceil(this.maxSize / 1024 / 1024)}MB限制`
    }
  },

  methods: {
    clickPreview (file) {
      console.log('file', file)
      const fileObj = file.file ? file.file : file
      console.log('fileObj', fileObj)
      const fileId = fileObj.attachId || fileObj.fileid
      const { fileBaseUrl } = fileObj
      const ext = getFileExt(fileBaseUrl)
      // 如果是图片不需要经过中转服务器
      if (checkImage(ext)) return
      nativeApi.getUser().then((user) => {
        attachmentCheck(fileBaseUrl, user.ssoToken, fileId).then(() => {
          console.log('文件转换成功')
        })
      })
    },
    beforeRead (file) {
      const fileList = Array.isArray(file) ? file : [file]
      const isRead = []
      fileList.forEach((f) => {
        const fileName = f.name || ''
        console.log('f.name: ', fileName, fileName
          .toLowerCase()
          .split('.')
          .pop())
        const checkExtension = () => !this.extensionList.length
          || this.extensionList.includes(
            fileName
              .toLowerCase()
              .split('.')
              .pop()
          )
        if (!checkExtension()) {
          this.$toast(`仅允许上传后缀名为${this.extensionList.join(',')}的文件，请检查上传文件格式`)
          isRead.push(false)
        } else {
          isRead.push(true)
        }
      })
      return isRead.every((v) => v === true)
    },
    onOversize () {
      this.$toast(this.checkSizeTip)
    },
    afterRead (file) {
      const fileList = Array.isArray(file) ? file : [file]
      fileList.forEach((f) => {
        this.uploadFile(f)
      })
    },
    uploadFile (file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const fileData = new FormData()
      fileData.append('file', file.file)
      return request({
        url: '/saas-api/attach/upload',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: fileData
      })
        .then((res) => {
          const { data: { data, code, msg } } = res
          if (code === 0) {
            file.status = 'done'
            file.message = '上传成功'
            const index = this.value.findIndex((v) => v.file === file.file)
            if (index > -1) {
              this.$set(this.value[index].file, 'id', data.id)
              this.$set(this.value[index].file, 'url', data.path)
              this.$set(this.value[index].file, 'operType', 'add')
              this.$set(this.value[index].file, 'ext', data.ext)
            }
          }
          if (code !== 0 && msg) {
            file.status = 'failed'
            file.message = '上传失败'
            this.$toast(msg)
          }
          this.$emit('input', this.value || [])
        })
        .catch((error) => {
          console.log('catch', error)
          file.status = 'failed'
          file.message = '上传失败'
        })
    },

    async handleDelete (val) {
      if (!this.isDelete || !val.id) return
      this.$toast.loading({ message: '', overlay: false })
      const {
        attachId,
        attachName,
        attachSize,
        attachUrl,
        fileType,
        id
      } = val
      const params = [{
        attachId,
        attachName,
        attachSize,
        attachUrl,
        fileType,
        id
      }]
      const { data: { code, msg } } = await request.post(deleteBatch, params)
      this.$toast.clear()
      if (code !== 0) return this.$toast.fail(msg || '操作失败')
    }
  }
}
</script>

<style lang="less" scoped>
.upload {
  .alert {
    color: rgb(25, 137, 250);
    background: rgb(236, 249, 255);
    word-break: break-all;
  }
  /deep/ .van-uploader__wrapper--disabled {
    opacity: 1;
  }
}
</style>
