import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';


function ModifyBoard() {
    const {id} = useParams();/* 객체일때 전개 방식 App.js의 라우터 링크에 :id 값을 받아오도록 해준다.*/
    const[board, setBoard] = useState({writer: '', subject: '', content:''})
    console.log(board)

    const change = (e) => {
        console.log("change")
        const name = e.target.name;
        const value = e.target.value;
        setBoard({...board,[name]:value});
        
        //한번의 이벤트당 하나의 속성 값을 수정할때는 전개하여 수정해야한다.
    }

    /* 이전 페이지로부터 값을 받아와서 처리한다. */
    useEffect(() => {
        axios.get(`http://localhost:8090/boarddetail/${id}`)
        .then((response) => {
            const board = response.data;
            console.log('useEffect : '+board)
            setBoard({
                  writer: board.writer
                , subject: board.subject
                , content:board.content
            });
        })
        .catch((error) => {

        })
    },[])

    const submit = (e) => {
        e.preventDefault();
        console.log("submit : "+JSON.stringify(board));
        /* const formData = new FormData();
        formData.append('writer', board.writer);
        formData.append('subject', board.subject);
        formData.append('content', board.content);
        console.log("submit formData : "+formData) */
        // formData로 처리하면 form형식이기때문에 @ModelAttribute 커맨드객체로 받을 수 있음.
        // 그냥 board객체로 던지면 JSON형태이다.
        axios.put(`http://localhost:8090/modify/${id}`, board)
        .then((response) => {
            alert(response.data)
            document.location.href='/';
        })
        .catch((error) => {
            console.log(error)
            alert(error)

        })
    }

    return(
        <section>
                <h2>게시판 글 등록</h2>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td className="td_left">
                                    <label htmlFor='writer'>글쓴이</label>
                                    </td>
                                <td className="td_right">
                                    <input type='text' name="writer" id="board_name" value={board.writer} onChange={change} />

                                </td>
                            </tr>
                            <tr>
                                <td className="td_left">
                                    <label htmlFor='subject'>제목</label>
                                    </td>
                                <td className="td_right">
                                    <input type='text' name="subject" id="board_subject" value={board.subject} onChange={change}  />
                                </td>
                            </tr>
                            <tr>
                                <td className="td_left">
                                    <label htmlFor='content'>내용</label>
                                    </td>
                                <td className="td_right">
                                    <textarea name='content' id='board_content' cols='40' rows='15' value={board.content} onChange={change}  ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <section id="commandCell">
                        <button onClick={submit}>저장</button>&nbsp;&nbsp;
                        <input type='reset' value='다시쓰기'/>
                    </section>
                </form>
            </section>
    )

}

export default ModifyBoard;