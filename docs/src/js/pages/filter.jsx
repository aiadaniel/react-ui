'use strict';

import React from 'react';
import Code from '../Code';
import Example from '../Example';
const { Filter } = global.uiRequire();

module.exports = class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filterText: ''
    };
  }

  render () {
    let options = [{
      label: '姓名',
      name: 'name',
      ops: ['like', '=', 'startWidth']
    }, {
      label: '年龄',
      name: 'age',
      ops: ['>=', '<'],
      type: 'number'
    }, {
      label: '生日',
      name: 'birthday',
      ops: ['>=', '<'],
      type: 'datetime'
    }, {
      label: '地区',
      name: 'office',
      ops: ['='],
      type: 'select',
      props: { data: ['Tokyo', 'Singapore', 'New York', 'London', 'San Francisco'] }
    }, {
      label: '国籍',
      name: 'country',
      ops: ['='],
      type: 'select',
      props: { fetch: {url: 'json/countries.json', cache:3600}, optionTpl: '{country}', valueTpl: '{en}' }
    }];

    return (
      <div>
        <div className="header">
          <h1>Filter</h1>
          <h2>筛选器</h2>
        </div>

        <div className="content">
          <Code>
{`<Filter
  options={array} // 选项数据
  local={bool}    // 本地数据过滤，默认值为 false
  onFilter={func} // 当确认时触发事件
  style={object}
/>
options = {
  label: 'string'  // 显示的文字，必填
  name: 'string'   // 对应的字段名称，必填
  ops: ['string']  // 可选方法，默认值为 ['=', 'like', '>', '>=', '<', '<=', 'in', 'not in']
  type: 'string'   // 选择值的类型，可选值为 'text', 'number', 'integer', 'datetime', 'select'
                   // 默认值为 'text'
  props: object    // type 为 Component 的参数
  'op': function   // 如果ops包含自定义方法，需要在前端做筛选，在此实现
}`}
          </Code>

          <h2 className="subhead">local</h2>
          <div>
            当local设置为 <em>true</em> 时，onFilter 返回的对象会包括当前选定 <em>op</em> 的方法，用来进行过滤。这个方法为返回值为 bool。<br />
            <Code>
{`startWidth: function (d, value) {
  return d.name.indexOf(value) === 0
}`}
            </Code>
            示例见 <a href="#/table">Table</a>。
          </div>

          <h2 className="subhead">Example</h2>
          <Example>
<Filter local={true}
  onFilter={fs => this.setState({ filterText: JSON.stringify(fs) })}
  options={[{
    label: '姓名',
    name: 'name',
    ops: ['like', '=', 'startWidth']
  }, {
    label: '年龄',
    name: 'age',
    ops: ['>=', '<'],
    type: 'number'
  }, {
    label: '生日',
    name: 'birthday',
    ops: ['>=', '<'],
    type: 'datetime'
  }, {
    label: '地区',
    name: 'office',
    ops: ['='],
    type: 'select',
    props: { data: ['Tokyo', 'Singapore', 'New York', 'London', 'San Francisco'] }
  }, {
    label: '国籍',
    name: 'country',
    ops: ['='],
    type: 'select',
    props: { fetch: {url: 'json/countries.json', cache:3600}, optionTpl: '{country}', valueTpl: '{en}' }
  }]} />
<div>{this.state.filterText}</div>
          </Example>
        </div>
      </div>
    );
  }
}
