/* import { Component } from "react"; */
import axios from 'axios';
import './WriteBoard.css';
import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
function DetailBoard() {

    const[board, setBoard] = useState({writer: '', subject: '', content:'',imageUrl:''})
    const {id} = useParams();/* 객체일때 전개 방식 App.js의 라우터 링크에 :id 값을 받아오도록 해준다.*/
    useEffect(() => {
        axios.get(`http://localhost:8090/boarddetail/${id}`)
        .then((response) => {
            const board = response.data;
            setBoard({
                  writer: board.writer
                , subject: board.subject
                , content:board.content
                , imageUrl:'http://localhost:8090/img/'+board.filename
            });
        })
        .catch((error) => {

        })
    },[])

    return (
        <section>
            <h2>게시판 글 내용</h2>
            <form>
                <table>
                    <tbody>

                        <tr>
                            <td className="td_left">
                                <label htmlFor='writer'>글쓴이</label>
                                </td>
                            <td className="td_right">
                                <input type='text' name="writer" id="board_name" value={board.writer} readOnly/>

                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label htmlFor='subject'>제목</label>
                                </td>
                            <td className="td_right">
                                <input type='text' name="subject" id="board_subject" value={board.subject} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label htmlFor='content'>내용</label>
                                </td>
                            <td className="td_right">
                                <textarea name='content' id='board_content' cols='40' rows='15' value={board.content} readOnly></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label htmlFor='file'>이미지</label>
                                </td>
                            <td className="td_right">
                                <img src={board.imageUrl} alt=''/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <section id="commandCell">
                    <Link to={'/modify/'+id}>수정</Link>
                    <Link to={'/delete/'+id}>삭제</Link>
                </section>
            </form>
        </section>
    )
}
/*
class DetailBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
              writer: ''
            , subject: ''
            , content: ''
            , imageUrl: ''
        }
    }
    componentDidMount = () => {
        axios.get(`http://localhost:8090/boarddetail/${id}`)
        .then((response) => {
            const board = response.data;
            this.setState({
                  writer: board.writer
                , subject: board.subject
                , content:board.content
                , imageUrl:'http://localhost:8090/img/'+board.filename
            });
        })
        .catch((error) => {

        })
    }

    render() {
        return(
            <section>
                <h2>게시판 글 내용</h2>
                <form>
                    <table>
	                    <tbody>
	                        <tr>
	                            <td className="td_left">
	                                <label htmlFor='writer'>글쓴이</label>
	                                </td>
	                            <td className="td_right">
	                                <input type='text' name="writer" id="board_name" value={this.state.writer} readOnly/>
	
	                            </td>
	                        </tr>
	                        <tr>
	                            <td className="td_left">
	                                <label htmlFor='subject'>제목</label>
	                                </td>
	                            <td className="td_right">
	                                <input type='text' name="subject" id="board_subject" value={this.state.subject} readOnly/>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td className="td_left">
	                                <label htmlFor='content'>내용</label>
	                                </td>
	                            <td className="td_right">
	                                <textarea name='content' id='board_content' cols='40' rows='15' value={this.state.content} readOnly></textarea>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td className="td_left">
	                                <label htmlFor='file'>이미지</label>
	                                </td>
	                            <td className="td_right">
	                                <img src={this.state.imageUrl} alt=''/>
	                            </td>
	                        </tr>
                        </tbody>
                    </table>
                    <section id="commandCell">
                        <a href="#">수정</a>&nbsp;&nbsp;
                        <a href="#">삭제</a>
                    </section>
                </form>
            </section>
        );
    }
}*/
export default DetailBoard;