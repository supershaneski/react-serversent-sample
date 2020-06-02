import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      txtData: '',
      todos: [],
    }

    this.ServerURL = 'http://localhost:5600';
    this.NotificationFlag = false; 

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePostData = this.handlePostData.bind(this);

  }

  componentDidMount() {
    
    //console.log(window.location)
    this.ServerURL = window.location.origin.replace('3000','5600');

    const events = new EventSource(this.ServerURL + '/events');

    events.onopen = function() {
      console.log("Connected to server, now listening...")
    }

    events.onmessage = (event) => {
      
      const parsedData = JSON.parse(event.data);

      const _todos = this.state.todos.slice(0);
      if(Array.isArray(parsedData)) {
        for(var i = 0; i < parsedData.length; i++) {
          const data = parsedData[i];
          if(!_todos.some(todo => {
            return todo.id === data.id;
          })) {
            _todos.push(data);
          } 
        }
      } else {

        this.sendNotification("Received Update")

        if(!_todos.some(todo => {
          return todo.id === parsedData.id;
        })) {
          _todos.push(parsedData);
        }
      }
      
      this.setState({
        todos: _todos,
      })
      
    };
    
    events.onerror = (error) => {
      console.log(error);
      events.close();
    }

    // Todo:
    if(window.Notification) {

      console.log("Notification API supported")

      if (Notification.permission === 'granted') {
        
        this.NotificationFlag = true;

        console.log("Permission already granted")
        //var notify = new Notification('text only');
        /*
        var notify = new Notification('text only');
        var notify = new Notification('composite', {
            body: 'text',
            icon: '/myimage.jpg', // absolute URL
        })
        */

      } else {
        
        console.log("Request permission")

        Notification.requestPermission().then(function(p){
          if(p === 'granted') {
            this.NotificationFlag = true;

            console.log("Permission granted")
            //var notify = new Notification('text only');
            /*
            var notify = new Notification('text only');
            var notify = new Notification('composite', {
                body: 'text',
                icon: '/myimage.jpg', // absolute URL
            })
            */
  
          } else {
            console.log("User declined permission");
          }
        }).catch(function(err){
          console.log(err);
        })
  
      }

    } else {
      console.log("Notification not supported.");
    }

  }

  sendNotification(msg) {
    if(!this.NotificationFlag) return;
    var notify = new Notification(msg);
  }

  handleTextChange(e) {
    this.setState({
      txtData: e.target.value,
    })
  }

  async handlePostData() {
    
    const postData = { "payload": this.state.txtData }

    let res = await fetch(this.ServerURL + '/todo', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(postData),
    })

    let data = await res.json();
    console.log(data);
    
  }
  
  render() {
    return (
      <div className="container">
      <div className="post-panel">
        <label>Data</label>
        <input type="text" onChange={this.handleTextChange} value={this.txtData} />
        <button onClick={this.handlePostData}>POST</button>
      </div>
      <div className="received-panel">
        <label>Received Data</label>
        <input type="text" list="messages" placeholder="Received data..." />
        <datalist id="messages">
          {
            this.state.todos.map(todo => {
              return (
                <option key={todo.id} value={todo.data}>{ todo.data }</option>
              )
            })
          }
        </datalist>
      </div>
    </div>
    )
  }
  
}

export default App;
