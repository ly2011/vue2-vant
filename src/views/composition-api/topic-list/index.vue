<template>
  <div>
    <i-table :columns="columns" :data="topics" />
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted } from '@vue/composition-api';
import { omit } from 'lodash';
import { useRouter } from '@/hooks/vue-router';
import request from 'utils/request';

const BASE_API = 'https://cnodejs.org/api/v1';

const fetchTopics = params => {
  return request(`${BASE_API}/topics`, { params });
};

export default defineComponent({
  setup() {
    const router = useRouter();
    // eslint-disable-next-line no-unused-vars
    const toDetail = id => {
      router.push({
        name: 'topic-detail',
        params: { id },
        query: { id },
      });
    };
    const columns = reactive([
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 120,
        formatter: (h, row) => {
          return h(
            'router-link',
            {
              props: {
                to: {
                  name: 'topic-detail',
                  params: { id: row.id },
                  query: { id: row.id },
                },
              },
            },
            row.title
          );
        },
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
        formatter: (h, row) => {
          return h(
            'a',
            {
              on: {
                click: () => toDetail(row.id),
              },
              attrs: {
                href: '#',
              },
            },
            row.good
          );
        },
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
    ]);
    const topics = reactive([]);
    const pagination = reactive({
      page: 1,
      limit: 10,
      total: 0,
    });

    const getTopics = params => {
      const newParams = {
        ...omit(pagination, 'total'),
        ...params,
      };
      fetchTopics(newParams).then(({ data }) => {
        topics.splice(0, topics.length, ...data.data);
        pagination.total = data.total;
      });
    };

    onMounted(() => {
      getTopics();
    });

    return {
      columns,
      topics,
      pagination,
      getTopics,
    };
  },
});
</script>
