import React from 'react'
import superagent from 'superagent'
import {ShowTable} from './showTable.jsx'
import {codeList} from './countryCode.js'
import './style.css'
export class TableList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			gl: '',
			show: false
		}
		
		this.search = React.createRef()
		this.location = React.createRef()
		this.submit = this.submit.bind(this)
		this.apiKey = 'AIzaSyAKjCDBAssx7WgYNWxk0bdovz6FJuQ3gSQ'
		this.cx = '003956996373418454308:0busojder-c'
	
	}
	submit(e){
		e.preventDefault()
		console.log('Search Query', this.search.current.value)
		console.log('Location', this.location.current.value)
		this.getGlCode()
		this.getResponse()
	}
	getGlCode(){
		if (this.location.current.value === '') {
			this.setState({
				gl: ''
			})
		} else {
		let eCountry = this.location.current.value.toLowerCase()
				console.log(eCountry)
			codeList.map((value)=>{
				let lval = value.Name.toLowerCase()
				if (lval === eCountry) {
					this.setState({
						gl: value.Code.toLowerCase()
					})
					
				}
			})
			console.log('gl value', this.state.gl)
		}
	}
	getResponse(){
		superagent.get('https://www.googleapis.com/customsearch/v1')
			.query({'key': this.apiKey,'cx': this.cx ,'q':this.search.current.value,'gl':this.state.gl})
			.then((res) =>{
				
				console.log('value of show', this.show)
				console.log('response', res)
				let arr = res.body.items
				// arr.map((value)=>{
				// 	console.log('value', value)
				// 	this.field =value
				// })
				this.field = arr
				this.setState({
					show: true
				})
				
			})
	}
	render(){
		return(
				<div>
					<h2>Custom Search</h2>
					<form onSubmit={this.submit} className="table-list-form">
						<label htmlFor="queryText">Search Query:</label>
						<input id="queryText" type="text"  placeholder="Search" ref={this.search} />
						<label htmlFor="date">Location:</label>
						<input id="location" type="text" placeholder="location" ref={this.location}/>
						<button> Search </button>
					
					</form>
					{(this.state.show) ? <ShowTable data={this.field}/> : (<h4>Enter the value</h4>)}
				</div>
			)
	}
}