<script>
import IEmpty from '../empty';

const noop = () => {};
export function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null,
  };
}

export function defaultRenderCell(h, { row, column, rowIndex, columnIndex }) {
  const key = column.key || column.dataIndex;
  const value = key && getPropByPath(row, key).v;
  if (column && column.formatter) {
    return column.formatter(h, row, column, value, rowIndex, columnIndex);
  }
  return value;
}

const COMPONENT_NAME = 'i-table';
export default {
  name: COMPONENT_NAME,
  components: { IEmpty },
  props: {
    showHeader: {
      type: Boolean,
      default: true,
    },
    data: {
      require: true,
      type: Array,
      default: () => [],
    },
    columns: {
      require: true,
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    onRow: Function,
    onCell: Function,
  },
  methods: {
    getRowKey(column) {
      const rowKey = column[this.rowKey] || column.key || column.dataIndex;
      if (!rowKey) {
        console.warn('rowKey is not exists.');
      }
      return column[this.rowKey] || column.key || column.dataIndex;
    },
  },
  render(h) {
    const isEmpty = !this.data || this.data.length < 1;
    return (
      <div class={{ 'table-box': true, empty: isEmpty }}>
        {isEmpty ? (
          <i-empty />
        ) : (
          <table class="table" cellspacing="0">
            {this.showHeader && (
              <thead>
                <tr>
                  {this.columns.map(column => (
                    <th key={this.getRowKey(column)} width={column.width}>
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            <tbody>
              {this.data.map((row, rowIndex) => (
                <tr key={rowIndex} onClick={this.onRow ? this.onRow(row, rowIndex) : noop}>
                  {this.columns.map((column, columnIndex) => (
                    <td
                      key={`${rowIndex}-${this.getRowKey(column)}`}
                      onClick={this.onCell ? this.onCell(row, rowIndex, column, columnIndex) : noop}
                    >
                      {defaultRenderCell(h, {
                        row,
                        column,
                        rowIndex,
                        columnIndex,
                      })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  },
};
</script>

<style lang="less" scoped>
.table-box {
  // width: calc(100% - 30px);
  // margin: 0 auto 20px;
  width: 100%;
  overflow: auto;
  &.empty {
    width: 100%;
  }
}
.table {
  table-layout: fixed;
  text-align: left;
  font-size: @font-size-normal;
  width: 100%;
  padding: 0;
  th {
    background: #fafafa;
  }
  td,
  th {
    // text-align: center;
    color: @black-table;
    padding: 8px 16px;
    font-weight: normal;
    border-bottom: 1px solid @gray-table;
    word-break: break-all;
  }
  tr:nth-child(2n) {
    border-bottom: 1px solid @gray-table;
  }
}
</style>
