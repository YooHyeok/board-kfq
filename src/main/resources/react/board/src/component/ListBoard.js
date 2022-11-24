import {useState, useEffect} from 'react';
import axios from 'axios';
import './ListBoard.css';
import {Link} from 'react-router-dom';

function ListBoard() {
    
    // function에서는 component에서 this.state 로 처리했던것을 set함수로
    // boards라는 변수에 setBoards() 함수를 생성하여 바인딩
    // this.state = {}
    const [boards, setBoards] = useState([]);
    /* ex)1 setter메소드 */
    /* 
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(0); 
    */
   /* ex)2*/
   /* const[acc, setAcc] = useState({id: '', name: '', balance:0}) */
   
   //useEffect : componentDidMount대신 사용. 변경되면서도 사용가능
    useEffect(() => {
        axios.get("http://localhost:8090/boardlist")
        .then((response) => {
            setBoards(response.data);
        })
        .catch((error) => {
        })
    },[]) //[] 는 한번만 실행시키기위해 처리


    return (
        <>
            <h2>글 목록&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to={'/write'}>글쓰기</Link></h2>
            <section>
                <table className='table_list'>
                    <tbody>
                        <tr id='tr_top'>
                            <th>번호</th>
                            <th>작성자</th>
                            <th>제목</th>
                        </tr>
                        {boards.map((board) => {
                            return (
                            <tr id='tr_con' key={board.id}>
                                <td> <Link to={'/detail/'+board.id}>{board.id}</Link></td>
                                <td>{board.writer}</td>
                                <td>{board.subject}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default ListBoard;