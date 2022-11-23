import { Component } from "react";
import axios from 'axios';
import './WriteBoard.css';

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
        axios.get('http://localhost:8090/boarddetail/4')
        .then((response) => {
            const board = response.data;
            this.setState({
                  writer: board.writer
                , subject: board.subject
                , content:board.content
                , imageUrl:'http://localhost:8090/img/'+board.filename
            });
            console.log(this.state.imageUrl);
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
}
export default DetailBoard;