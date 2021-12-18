import React, { Component } from 'react'

export default class App extends Component {
    constructor() {
        super();
        this.state={
            title:'',
            description:'',
            _id:'',
            tasks:[]

        }
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    ///agregar tarea 
    componentDidMount(){
        this.getTasks()
    }
    addTask(e){
        e.preventDefault()
        if (this.state._id) {
            fetch('api/page/'+this.state._id,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=> res.json())
                .then(data=>{
                    console.log(data)
                    M.toast({html:'task updated'})
                    this.setState({title:'',description:'', _id: ''})
                    this.getTasks()
                })
                .catch(err=> console.error(err))
        }else{
            fetch('/api/page',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(res=> res.json())
                .then(data=>{
                    console.log(data)
                    M.toast({html:'task saved'})
                    this.setState({title:'',description:''})
                    this.getTasks()
                })
                .catch(err=> console.error(err))
        }
    }


    //muestra tareas
    getTasks(){
        fetch('api/page')
            .then(res=> res.json())
            .then(data=>{ 
                console.log(data)
                this.setState({tasks: data})
            })
    }

    deleteTask(id){
        if (confirm('Are you sure you want to delete this task?')) {
            fetch('api/page/'+id, {
                method:'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(res=>res.json())
                .then(data=> {
                    M.toast({html:'task deleted'})
                    this.getTasks()
                })
        }
            
    }

    editTask(id){
        fetch('api/page/'+id)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                this.setState({
                    title: data.title,
                    description:data.description,
                    _id: data._id
                })
            })
    }

    handleChange(e){
        const {name, value } = e.target
        this.setState({
            [name]:value
        })
    }

    render() {
        return (
            <div>
                {/* navigation*/}
                <nav className='light-blue darken-2'>
                    <div className='container'>
                        <a className='brand-logo' href='/'>Mern</a>
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field s12'>
                                                <input name='title' value={this.state.title} onChange={this.handleChange} type='text' placeholder='task title'/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field s12'>
                                                <textarea name='description' value={this.state.description} onChange={this.handleChange} className='materialize-textarea' placeholder='task description'/>
                                            </div>
                                        </div>
                                        <button className='btn light-blue darken-2' type='submit'>Guardar tarea</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Description</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task=>{
                                            return (
                                            <tr key={task._id}> 
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>  
                                                    <button style={{margin: "4px"}} onClick={()=>{this.editTask(task._id)}} className='btn light-blue darken-2'><i className='material-icons'>edit</i></button>
                                                    <button style={{margin: "4px"}} onClick={()=>{this.deleteTask(task._id)}} className='btn red darken-1'><i className='material-icons'>delete</i></button>
                                                </td>
                                            </tr>)
                                        })
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
