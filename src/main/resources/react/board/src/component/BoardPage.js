import {useState, useEffect} from 'react';
import axios from 'axios';
import './ListBoard.css';
import {Link} from 'react-router-dom';

function BoardPage() {
    
    // function에서는 component에서 this.state 로 처리했던것을 set함수로
    // boards라는 변수에 setBoards() 함수를 생성하여 바인딩
    // this.state = {}
    const [boards, setBoards] = useState([]);
    const [pageInfo, setPageInfo] = useState({
          allPage: 0
        , curPage: 0
        , startPage: 0
        , endPage: 0
    });
   
   //useEffect : componentDidMount대신 사용. 변경되면서도 사용가능
    useEffect(() => {
        serverRequest(1)
    },[])

    const pageRequest = (e) => {
        serverRequest(e.target.value);
    }

    const serverRequest = (page) => {
        axios.get("http://localhost:8090/boardpage/"+page)
        .then((response) => {
            setPageInfo(response.data.pageInfo);
            setBoards(response.data.boards);
        })
        .catch((error) => {
        })
    }

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
            <section id="pageList">
                        {
                            (() => {
                                const array = [];
                                // startpage부터 endpage까지 1씩 증가하면서 반복.
                                for(let i = pageInfo.startPage; i<= pageInfo.endPage; i++){ 
                                    // array에 반복해서 push한다.
                                    array.push(
                                        <span key={i}><button value={i} onClick={pageRequest}>{i}</button>&nbsp;&nbsp;</span>
                                    )
                                }
                                return array;
                            })()
                        }
            </section>
        </>
    );
}

export default BoardPage;