import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{ axios.get('http://localhost:5000/articles').then(res=>setArticles(res.data)) }, []);
    return (
        <div className="container mt-4">
            <h1 className="mb-4">All Articles</h1>
            <nav><Link to='/' className="btn btn-primary me-2">Home</Link>
                 <Link to='/add' className="btn btn-success me-2">Add Article</Link>
                 <Link to='/search' className="btn btn-info">Search</Link></nav>
            <div className="row mt-3">
                {articles.map(a=>(
                    <div className="col-md-4 mb-3" key={a.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{a.title}</h5>
                                <p className="card-text">{a.content}</p>
                                {a.date && <small className="text-muted">{new Date(a.date).toLocaleString()}</small>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AddArticle() {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [msg,setMsg] = useState('');
    const handleAdd=()=>{
        if(!title||!content){setMsg('Please fill both fields');return;}
        axios.post('http://localhost:5000/articles',{title,content}).then(res=>{
            setMsg('Article added successfully'); setTitle(''); setContent('');
        });
    };
    return (
        <div className="container mt-4">
            <h1>Add Article</h1>
            <nav><Link to='/' className="btn btn-primary me-2">Home</Link>
                 <Link to='/search' className="btn btn-info">Search</Link></nav>
            <div className="mt-3">
                {msg && <div className="alert alert-success">{msg}</div>}
                <input className="form-control mb-2" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
                <textarea className="form-control mb-2" placeholder='Content' value={content} onChange={e=>setContent(e.target.value)} rows="5"/>
                <button className="btn btn-success" onClick={handleAdd}>Add Article</button>
            </div>
        </div>
    );
}

function Search() {
    const [query,setQuery] = useState('');
    const [results,setResults] = useState([]);
    const handleSearch=()=>{
        axios.get(`http://localhost:5000/search?q=${query}`).then(res=>setResults(res.data));
    };
    return (
        <div className="container mt-4">
            <h1>Search Articles</h1>
            <nav><Link to='/' className="btn btn-primary me-2">Home</Link>
                 <Link to='/add' className="btn btn-success me-2">Add Article</Link></nav>
            <div className="mt-3">
                <div className="input-group mb-3">
                    <input className="form-control" placeholder="Search..." value={query} onChange={e=>setQuery(e.target.value)}/>
                    <button className="btn btn-info" onClick={handleSearch}>Search</button>
                </div>
                <div className="row">
                    {results.map(a=>(
                        <div className="col-md-4 mb-3" key={a.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{a.title}</h5>
                                    <p className="card-text">{a.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function App(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/add' element={<AddArticle/>}/>
                <Route path='/search' element={<Search/>}/>
            </Routes>
        </Router>
    );
}

ReactDOM.render(<App/>,document.getElementById('root'));
