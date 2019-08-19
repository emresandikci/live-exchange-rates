import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { colors, currencyStatus } from '../../helper';

const Style = createGlobalStyle`
  table th,td{
    color:${colors.text.primary};
  }
  table{
    overflow:hidden;
    margin-bottom:1rem; 
  }
  tbody {
    display:block;
    height:400px;
    overflow-y:scroll;
  }
  thead, tbody tr {
      display:table;
      width:100%;
      table-layout:fixed;
  }
  thead{
    background-color:transparent;
  }
  th{
    background-color:${colors.table.th};
    padding-top:1rem;
    padding-bottom:1rem;
    text-align:center;
    cursor:default;
  }
  td{
    padding:.5rem 0;
    border-bottom:1px #2196f3 dashed;
    text-align:center;
  }
  tr:last-child td{
    border:none;
  }
  tr{
    :hover{
      background-color:${colors.white.secondary};
      cursor: pointer;
    }
  }
  .increased{
    background-color:${colors.blue.rgbaPrimary};
    color:${colors.blue.primary}
  }
  .decreased{
    background-color:${colors.red.rgbaPrimary};
    color:${colors.red.primary}
  }
`;

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeStatus: currencyStatus.EQUAL,
      data: this.props.data
    }
  }

  getChangeClass = (status, column) => {

    switch (status) {
      case currencyStatus.INCREASED:

        return 'increased';
      case currencyStatus.DECREASED:

        return 'decreased';
      case currencyStatus.EQUAL:

        return '';

      default:
        break;
    }
  }
  render() {
    return (
      <React.Fragment>
        <Style />
        <table>
          <thead>
            <tr>
              {this.props.columns.map(item => {
                return (
                  <th>{item.text}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.data != null && this.props.data.map((data, key) => (
              <tr key={key}>
                {this.props.columns.map((column, key) => {
                  return (
                    <td key={key} className={this.getChangeClass(data.status, column.name)}>
                      {data[column.name]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}



export default Table;