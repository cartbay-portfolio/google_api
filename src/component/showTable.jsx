import React from 'react'
import './style.css'
export class ShowTable extends React.Component{
	
	render(){ 
		console.log('data', this.props.data)
		const data = this.props.data.map((data) => <tr key={data.link}><td>{data.title}</td>{data.snippet}<td>{data.link}</td></tr>);
		return(
			<div>
			<h2>Data</h2>
				<table>
					<tbody>
						<tr className="heading">
							<th>Title</th>
							<th>Descripition</th>
							<th>Link</th>
						</tr>
						{data}
					</tbody>
				</table>
			</div>
			)
	}
	
}