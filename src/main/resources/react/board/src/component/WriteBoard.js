import { Component } from "react";
import './WriteBoard.css';
import axios from 'axios';

class WriteBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
              writer: ''
            , password: ''
            , subject: ''
            , content: ''
            , file: null
        }
    }
    fileChange = (e) => {
        this.setState({file: e.target.files[0]})
    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name] : value})
    }

    submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('writer', this.state.writer);
        formData.append('password', this.state.password);
        formData.append('subject', this.state.subject);
        formData.append('content', this.state.content);
        formData.append('file', this.state.file);

        axios.post('http://localhost:8090/writeboard2', formData)
        .then((response) => {
            alert(response.data)
        })
        .catch((error) => {
            alert(error)

        })
    }

    render() {
        return (
            <section>
                <h2>게시판 글 등록</h2>
                <form>
                    <table>
                        <tr>
                            <td className="td_left">
                                <label htmlFor='writer'>글쓴이</label>
                                </td>
                            <td className="td_right">
                                <input type='text' name="writer" id="board_name" value={this.state.writer} onChange={this.change} />

                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label htmlFor='password'>비밀번호</label>
                                </td>
                            <td className="td_right">
                                <input type='password' name="password" id="board_pass" value={this.state.password} onChange={this.change}  />

                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label htmlFor='subject'>제목</label>
                                </td>
                            <td className="td_right">
                                <input type='text' name="subject" id="board_subject" value={this.state.subject} onChange={this.change}  />
                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label htmlFor='content'>내용</label>
                                </td>
                            <td className="td_right">
                                <textarea name='content' id='board_content' cols='40' rows='15' value={this.state.content} onChange={this.change}  ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label fhtmlForor='file'>파일첨부</label>
                                </td>
                            <td className="td_right">
                                <input type='file' name="file" id="board_file" onChange={this.fileChange} accept="image/*"/>
                            </td>
                        </tr>
                    </table>
                    <section id="commandCell">
                        <button onClick={this.submit}>등록</button>&nbsp;&nbsp;
                        <input type='reset' value='다시쓰기'/>
                    </section>
                </form>
            </section>
        )
    }
}

export default WriteBoard;