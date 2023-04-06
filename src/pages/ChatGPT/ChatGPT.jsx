import React, { useState, useEffect } from 'react';
import './ChatGPT.css';
import * as eventAPI from '../../services/events-api';

function ChatGPT(props) {
const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);

    const fetchData = async () => {
        const result = await eventAPI.getChatGPTResponse(inputValue);
        console.log("result received");
        if(result.err) {
            // replace page if error retrieving event data
            result.err && props.history.replace('/');
        } else {
            console.log("result");
            console.log(result);
            setResponse(result);
        }
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='mychatgpt'>
      <div class="container">
        <div class="container__item">
          <form class="form" onSubmit={handleSubmit}>
            <input type="text" class="form__field" placeholder="Prompt..." value={inputValue} onChange={handleInputChange} />
            <button type="submit" class="btn btn--primary btn--inside uppercase">Ask ChatGPT</button>
          </form>
        </div>
        <div>
        {response && 
            (
                <div style={{marginTop: "2rem"}}>
                <h5>Response from ChatGPT:</h5>
                <p>{response}</p>
                </div>
            )
            }
        </div>
      </div>
    </div>

    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
    //   <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', padding: '1rem' }} onSubmit={handleSubmit}>
    //     <label>
    //       Prompt:
    //       <input type="text" value={inputValue} onChange={handleInputChange} style={{ margin: '1rem' }} />
    //     </label>
    //     <button type="submit" style={{ margin: '1rem' }}>Ask ChatGPT</button>
    //     {response && 
    //     (
    //         <>
    //         <p>Response from ChatGPT:</p>
    //         <p>{response}</p>
    //         </>
    //     )
    //     }
    //   </form>
    // </div>
  );
}

export default ChatGPT;
