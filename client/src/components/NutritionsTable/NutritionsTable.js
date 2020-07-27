import React from 'react';
import { deleteNutritions, fetchNutritions, deleteMultipleNutritions } from '../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useTable, useSortBy } from 'react-table'
import './NutritionsTable.css';

class NutritionsTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {nutritionsSelected: []};
  }

  componentDidMount = () => {
    this.props.fetchNutritions();
  }

  deleteNutritions = (id) => {
    if(window.confirm('Are you sure, you want to delete the selected one?')) {
      this.props.deleteNutritions(id);
      window.location.reload();
    }
  }

  deleteMultipleNutritions = (e) => {
    e.preventDefault();

    if(this.state.nutritionsSelected.length > 0 && window.confirm(`Are you sure, you want to delete the selected ${this.state.nutritionsSelected.length} nutrition(s)?`)) {
      this.props.deleteMultipleNutritions(this.state.nutritionsSelected);
      window.location.reload();
    }
  }

  restore = async (e) => {
    e.preventDefault();

    this.props.client.resetStore();
    window.location.reload();
  }

  checkNutrition = (id, selected) => {
    // let nutritionsSelected = this.state.nutritionsSelected || [];

    if(selected) {
      // nutritionsSelected.push(parseInt(id));
      this.setState((state, props) => {nutritionsSelected: state.nutritionsSelected.push(parseInt(id))});
    } else {
      // nutritionsSelected = nutritionsSelected.filter(eid => eid !== parseInt(id));
      this.setState((state, props) => {nutritionsSelected: state.nutritionsSelected.filter(eid => eid !== parseInt(id))});      
    }

    // this.setState((state, props) => {nutritionsSelected: state.nutritionsSelected});
  }

  render () {
    const { nutritions } = this.props;

    const columns = [
      {
        Header: '',
        accessor: 'id',
        Cell: props => {
          return <input type="checkbox" className="btn btn-sm btn-danger rounded-circle float-right" onChange={(e) => {
              this.checkNutrition(props.row.original.id, e.target.checked)
            }} />
        }
      },
      {
        Header: 'Dessert(100g Serving)',
        accessor: 'Dessert',
        sortType: 'basic'
      },
      {
        Header: 'Calories',
        accessor: 'nutritionInfo.calories',
        sortType: 'basic'
      },
      {
        Header: 'Fat (g)',
        accessor: 'nutritionInfo.fat',
        sortType: 'basic'
      },
      {
        Header: 'Carbs (g)',
        accessor: 'nutritionInfo.carb',
        sortType: 'basic'
      },
      {
        Header: 'Protein (g)',
        accessor: 'nutritionInfo.protein',
        sortType: 'basic'
      },
      {
        Header: ' ',
        Cell: props => {
          return <button className="btn btn-sm btn-danger rounded-circle float-right" onClick={(e) => {
              e.preventDefault();
              this.deleteNutritions(props.row.original.id)
            }}>X</button>
        }                  
      }
    ];

    return (      
      <React.Fragment>
        <div className="mt1" style={{paddingBottom: 10}}>
          {this.state.nutritionsSelected.length > 0 && <label>{this.state.nutritionsSelected.length} selected</label>}
          <a className="pa2 input-reset ba bg-green hover-bg-green hover-white w-10 pointer f8 dib fw7" href="/add">ADD</a> &nbsp;
          <a className="pa2 input-reset ba bg-red hover-bg-red hover-white w-10 pointer f8 dib fw7" onClick={(e) => this.deleteMultipleNutritions(e)}>REMOVE</a> &nbsp;
          <a className="pa2 input-reset ba bg-red hover-bg-red hover-white w-10 pointer f8 dib fw7" onClick={(e) => this.restore(e)}>RESET DATA</a>
        </div> 
        <Table columns={columns} data={(nutritions && nutritions.nutritions) || []} />        
      </React.Fragment>
    );
  }
}

const CheckBox = (props) => {

  return (
    <input type="checkbox" className="btn btn-sm btn-danger rounded-circle float-right" onChange={(e) => {
      this.checkNutrition(props.row.original.id, e.target.checked)
    }} />
  )
}

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  },
  useSortBy)

  return (
    <table {...getTableProps()} className="collapse ba br2 b--black-10 pv2 ph3 w-100">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className="bg-white">
            {headerGroup.headers.map(column => (
              <th align="left" {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} className="striped--light-gray">
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const mapStateToProps = (state) => {
  return {
    nutritions: state.nutritions,
    nutritionDeleted: state.nutritionDeleted,
    nutritionsDeleted: state.nutritionsDeleted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNutritions: bindActionCreators(deleteNutritions, dispatch),
    fetchNutritions: bindActionCreators(fetchNutritions, dispatch),
    deleteMultipleNutritions: bindActionCreators(deleteMultipleNutritions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NutritionsTable)