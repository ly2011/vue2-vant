<template>
  <i-table :columns="columns" :data="data" />
</template>

<script>
export const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 120,
  },
  {
    title: '作者',
    dataIndex: 'author.loginname',
    key: 'author.loginname',
    width: 120,
  },
  {
    title: '精华',
    dataIndex: 'good',
    key: 'good',
    width: 120,
  },
  {
    title: '置顶',
    dataIndex: 'top',
    key: 'top',
    width: 120,
  },
  {
    title: '阅读数',
    dataIndex: 'visit_count',
    key: 'visit_count',
    width: 120,
  },
  {
    title: '回复数',
    dataIndex: 'reply_count',
    key: 'reply_count',
    width: 120,
  },
  {
    title: '创建日期',
    dataIndex: 'create_at',
    key: 'create_at',
    width: 120,
  },
];
export default {
  name: 'topic-detail',
  data() {
    return {
      columns,
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      for (let i = 0; i < 10; i++) {
        this.data.push({
          id: i,
          title: '标题' + i,
        });
      }
    },
  },
};
</script>
