/**
 * Constants 常量
 */

/* 默认前后端交互格式-日期 */
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

/* 默认前后端交互格式-日期时间 */
export const DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/* 默认前后端交互格式-时间 */
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss';

/* 特定格式的日期处理格式，时分秒指定为00:00:00 */
export const DATETIME_MIN = 'YYYY-MM-DD 00:00:00';
/* 特定格式的日期处理格式，时分秒指定为23:59:59 */
export const DATETIME_MAX = 'YYYY-MM-DD 23:59:59';

/* 方法调用时，防反跳时间 */
export const DEBOUNCE_TIME = 200;

/* 分页大小 */
/* 设置每页请求条数 */
export const GLOBAL_PAGE_SIZE = 10;
/* 指定每页可以显示多少条，第一个值需保持与 GLOBAL_PAGE_SIZE 一致 */
export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

/** 页面 */
// 查询表单Row的水槽
export const SEARCH_FORM_ROW_LAYOUT = {
  gutter: 12,
};
// 编辑表单Row的水槽
export const EDIT_FORM_ROW_LAYOUT = {
  gutter: 48,
};

/**
 *  表单 Col layout属性
 */

// 3/4
export const FORM_COL_3_4_LAYOUT = {
  span: 18,
};

// 2/3
export const FORM_COL_2_3_LAYOUT = {
  span: 16,
};

// 1/2
export const FORM_COL_2_LAYOUT = {
  span: 12,
};

// 1/3
export const FORM_COL_3_LAYOUT = {
  span: 8,
};

// 1/4
export const FORM_COL_4_LAYOUT = {
  span: 6,
};

// 查询表单 拥有 超过两个字段时 表单字段的布局
export const SEARCH_FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

// 编辑表单 表单字段的布局
export const EDIT_FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 15,
  },
};

// 编辑表单 表单字段的布局 占据 一半的宽度
export const EDIT_FORM_ITEM_LAYOUT_COL_2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

// 编辑表单 表单字段的布局 占据整行
export const EDIT_FORM_ITEM_LAYOUT_COL_3 = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};

// 表单字段的通用 className
export const SEARCH_FORM_CLASSNAME = ' more-fields-search-form ';
export const EDIT_FORM_CLASSNAME = ' more-fields-form ';

// 查询表单 按钮 Col 的样式
export const SEARCH_COL_CLASSNAME = ' search-btn-more ';

// 表格的操作按钮 的 父元素的class
export const TABLE_OPERATOR_CLASSNAME = ' table-operator ';

/** 弹窗 */
export const MODAL_FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
