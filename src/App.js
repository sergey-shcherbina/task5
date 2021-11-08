import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Form,  Row, Col, Button} from 'react-bootstrap'

const App = () => {
	const [region, setRegion] = useState('')
	const [err, setErr] = useState('')
	console.log(err)

	//const [seed,setSeed] = useState('')

	const [slider, setSlider] = useState({
		max: 10, 
		min: 0, 
		value: 0, 
		step: 0.25,
		label: ''
	});

	//console.log(slider.value)

	const [ps, setPs] = useState([])

	function sortName(a, b) {
		//return a.code - b.code
		let nameA = a.name.toLowerCase(), 
		    nameB = b.name.toLowerCase()
		if (nameA < nameB) return -1
		if (nameA > nameB) return 1
		return 0
	}

	const [persons, setPersons] = useState([])
	const [num, setNum] = useState(0)
	useEffect(() => {
			axios.get(`http://localhost:8080`)
      .then(response => setPersons(response.data))
	}, [])
	useEffect(() => {
		setPs(persons.filter(person => person.country ===`${region}`).sort(sortName).slice(0 + num, 20 + num))
	}, [region, num])
	
	useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])
	const scrollHandler = (event) => { 
    if (event.target.documentElement.scrollHeight - 
      (event.target.documentElement.scrollTop + window.innerHeight) < 50 ) {
			setNum(prevState => prevState + 10)	
    }
  }
	
	console.log(ps)

	const psJsx = ps.map((person, index) => 
		<tr key={person.id}>
			<td>{index + num + 1}</td>
			<td>{person.code}</td>
			<td>{person.country === 'en_US' ? person.name.slice(0, -1) : person.name}</td>
			<td>{person.state}</td>
			<td>{person.phone}</td>
		</tr>
	)
	function errDel() {
		// for (let j = 1040; j < 1103; j++) {
		// 	console.log(j, String.fromCharCode(j))
		// }
		let temp
		let copy = Object.assign([], ps)
		for (let i = 0; i < copy.length; i++) {
				temp = String(copy[i].name).split('')
				temp.splice(Math.floor(Math.random() * String(copy[i].name).length), 1)
				copy[i].name = temp.join('')
				temp = String(copy[i].phone).split('')
				temp.splice(Math.floor(Math.random() * String(copy[i].phone).length), 1)
				copy[i].phone = temp.join('')
				temp = String(copy[i].state).split('')
				temp.splice(Math.floor(Math.random() * String(copy[i].state).length), 1)
				copy[i].state = temp.join('')
				temp = String(copy[i].code).split('')
				temp.splice(Math.floor(Math.random() * String(copy[i].code).length), 1)
				copy[i].code = temp.join('')

				copy = [...copy.slice(0, i), {name: copy[i].name, id: copy[i].id, country: copy[i].country, phone: copy[i].phone, region: null, state: copy[i].state, code: copy[i].code }, ...copy.slice(i + 1)]
			
		} 
		setPs(copy)
	}
	// function errAdd() {
	// 	let temp
	// 	let copy = Object.assign([], ps)
	// 	for (let i = 0; i < copy.length; i++) {
	// 			Math.floor(Math.random() * 66 + 1040)
	// 			temp = String(copy[i].name).split('')
	// 			temp.splice     (Math.floor(1040 + Math.random() * (1103-1040))  + String(copy[i].phone).length), 1)
	// 			copy[i].name = temp.join('')
	// 			temp = String(copy[i].phone).split('')
	// 			temp.splice(Math.floor(Math.random() * String(copy[i].phone).length), 1)
	// 			copy[i].phone = temp.join('')
	// 			temp = String(copy[i].state).split('')
	// 			temp.splice(Math.floor(Math.random() * String(copy[i].state).length), 1)
	// 			copy[i].state = temp.join('')
	// 			temp = String(copy[i].code).split('')
	// 			temp.splice(Math.floor(Math.random() * String(copy[i].code).length), 1)
	// 			copy[i].code = temp.join('')

	// 			copy = [...copy.slice(0, i), {name: copy[i].name, id: copy[i].id, country: copy[i].country, phone: copy[i].phone, region: null, state: copy[i].state, code: copy[i].code }, ...copy.slice(i + 1)]
			
	// 	} 
	// 	setPs(copy)
	// }
		

 return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
			<Form className="mt-3">
				<Row>
					<Col>
							<Form.Select value={region} onChange={event => setRegion(event.target.value)}>
								<option>Choose region</option>
								<option value="ru">Russia</option>
								<option value="uk">Ukraine</option>
								<option value="en_US">USA</option>
							</Form.Select>
					</Col>
					<Col>
						<Form.Label>error 0-10 step 0.25</Form.Label>
						<Form.Range 
							min={slider.min}
							max={slider.max}
							value={slider.value}
							step={slider.step}
							onChange={event => setSlider(event.target.value)}
							/>
					</Col>
					<Col>
						<Form.Control
							placeholder="Error 0-1000"
							onChange={event => setErr(event.target.value)}
							/>
					</Col>
					<Col>
						<Form.Control placeholder="Enter seed" />
					</Col>
					<Col>
						<Button variant={"outline-dark"} onClick={errDel}>Random</Button>
					</Col>
				</Row>
			</Form>	
  		<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>-</th>
						<th>Acc Code</th>
						<th>Full Name</th>
						<th>State</th>
						<th>Phone</th>
					</tr>
  			</thead>
  			<tbody>
					{psJsx}
				</tbody>
			</Table>
    </div>
  )
} 
export default App  










