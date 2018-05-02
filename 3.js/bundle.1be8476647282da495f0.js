webpackJsonp([3],{1194:function(e,n,t){var o=t(0),r=t(8),a=t(9).PageRenderer;a.__esModule&&(a=a.default);var s=r({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:t(1227)}},componentWillMount:function(){},render:function(){return o.createElement(a,Object.assign({},this.props,{content:this.state.content}))}});s.__catalog_loader__=!0,e.exports=s},1227:function(e,n){e.exports="`reactabular-resizable` implements a formatter that provides handles for altering column widths. It provides two functions:\n\n* `column({ parent = document, onDrag, minWidth = 10, props: { ... }})`. This formatter does most of the work.\n* `helper({ globalId, getId })` returns an object with `initialize({ columns, getId: (column, index) => ...})`, `cleanup()`, and `update({ column, width })` methods. The helper can be used with the formatter to implement performant resizing. It utilizes CSS stylesheets for this purpose. It also expects you set `width` per each column at your column definition.\n\nNote that the current implementation doesn't constrain the total width of the table. That would require additional logic as you would have to check for this while altering a column width.\n\nIf you want to resizing with nested column, give a `resizableFormatter` formatter on children **except parent column**.\nBelow example included nested column. If you don't want to using nested column, remove related nested columns code.\n\n## How to Use?\n\nThe following example adjusts column widths through CSS to keep the performance high while using a sticky header/body. This way we can avoid touching the DOM through React and let the browser do the work.\n\nYou can customize `props` of specific portions through the following protocol:\n\n```javascript\nprops = {\n  container: {},\n  value: {},\n  handle: {}\n}\n```\n\n> You can find suggested default styling for the package at `style.css` in the package root.\n\n```jsx\n/*\nimport React from 'react';\nimport * as Table from 'reactabular-table';\nimport * as Sticky from 'reactabular-sticky';\nimport * as resizable from 'reactabular-resizable';\nimport uuid from 'uuid';\nimport { generateRows } from './helpers';\nimport * as resolve from 'table-resolver';\n*/\n\n\nconst schema = {\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    name: {\n      type: 'string'\n    },\n    address: {\n      type: 'string'\n    },\n    company: {\n      type: 'string'\n    },\n    age: {\n      type: 'integer'\n    }\n  },\n  required: ['id', 'name', 'age', 'company']\n};\nconst rows = generateRows(100, schema);\n\nclass ResizableColumnsTable extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      columns: this.getColumns(),\n      rows\n    };\n\n    this.tableHeader = null;\n    this.tableBody = null;\n  }\n  componentWillMount() {\n    this.resizableHelper = resizable.helper({\n      globalId: uuid.v4(),\n      getId: ({ property}) => property\n    });\n\n    // Patch the column definition with class names.\n    this.setState({\n      columns: this.resizableHelper.initialize(this.state.columns)\n    });\n  }\n  componentWillUnmount() {\n    this.resizableHelper.cleanup();\n  }\n  getColumns() {\n    const resizableFormatter = resizable.column({\n      onDragStart: (width, { column }) => {\n        console.log('drag start', width, column);\n      },\n      onDrag: (width, { column }) => {\n        this.resizableHelper.update({\n          column,\n          width\n        });\n      },\n      onDragEnd: (width, { column }) => {\n        console.log('drag end', width, column);\n      }\n    });\n\n    return [\n      {\n        property: 'name',\n        header: {\n          label: 'Name',\n          formatters: [\n            resizableFormatter\n          ]\n        },\n        width: 100\n      },\n      {\n        header: {\n          label: 'About'\n        },\n        children: [\n          {\n            property: 'company',\n            header: {\n              label: 'Company',\n              formatters: [\n                resizableFormatter\n              ],\n            },\n            width: 100\n          },\n          {\n            property: 'address',\n            header: {\n              label: 'Address',\n              formatters: [\n                resizableFormatter\n              ],\n            },\n            width: 200\n          },\n        ],\n      },\n      {\n        property: 'age',\n        header: {\n          label: 'Age'\n        }\n      }\n    ];\n  }\n  getClassName(column, i) {\n    return `column-${this.id}-${i}`;\n  }\n  render() {\n    const { rows, columns } = this.state;\n\n    const resolvedColumns = resolve.columnChildren({ columns });\n    const resolvedRows = resolve.resolve({\n        columns: resolvedColumns,\n        method: resolve.nested\n      })(rows);\n\n    return (\n      <Table.Provider\n        className=\"pure-table pure-table-striped\"\n        columns={resolvedColumns}\n        style={{ width: 'auto' }}\n      >\n        <Sticky.Header\n          style={{\n            maxWidth: 800\n          }}\n          headerRows={resolve.headerRows({ columns })}\n          ref={tableHeader => {\n            this.tableHeader = tableHeader && tableHeader.getRef();\n          }}\n          tableBody={this.tableBody}\n        />\n\n        <Sticky.Body\n          rows={resolvedRows}\n          rowKey=\"id\"\n          onRow={this.onRow}\n          style={{\n            maxWidth: 800,\n            maxHeight: 400\n          }}\n          ref={tableBody => {\n            this.tableBody = tableBody && tableBody.getRef();\n          }}\n          tableHeader={this.tableHeader}\n        />\n      </Table.Provider>\n    );\n  }\n  onRow(row, { rowIndex }) {\n    return {\n      className: rowIndex % 2 ? 'odd-row' : 'even-row',\n    };\n  }\n}\n\n<ResizableColumnsTable />\n```\n\n## How to Move the Widget to the Column Border?\n\nGiven it can be neater to have the resize widget at the column border, you can offset it like this:\n\n```css\n.resize-handle {\n  margin-right: -1em; /* offset based on padding */\n}\n```\n\nYou will need to figure out the exact offset based on your header cell size.\n"}});