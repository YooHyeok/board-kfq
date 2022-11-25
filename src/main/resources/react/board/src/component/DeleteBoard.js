import {useState} from 'react'
import {useParams} from 'react-router-dom';
import DeleteBoard from 'DeleteBoard';
import axios from 'axios';

function DeleteBoard() {

    const {id} = useParams();
    const [password, setPassword] = useState('');

    const deleteBtn = (e) => {

        e.preventDefault();
        console.log(password);
        axios.delete(`http://localhost:8090/delete/${id}`
        , {data:{
            password : password}
        })
        .then((response) => {
            alert(response.data)
            const messageNo = response.data;
            if(messageNo == -1) alert("글번호 오류")
            if(messageNo == -2) alert("비밀번호 오류")
            if(messageNo == 0) { 
                alert("글삭제 성공")
                document.location.href='/';
            }
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        }) 
        /* axios.put(`http://localhost:8090/delete/${id}`
        ,null , {params:{password:password}} )
        .then((response) => {
            alert(response.data)
            const messageNo = response.data;
            if(messageNo == -1) alert("글번호 오류")
            if(messageNo == -2) alert("비밀번호 오류")
            if(messageNo == 0) { 
                alert("글삭제 성공")
                document.location.href='/';
            }
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        }) */
    }

    return(
        <selection id="passForm">
            <table>
                <tr>
                    <td><label htgmFor = "password">글 비밀번호</label></td>
                    <td><input type="text" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={deleteBtn}>삭제</button>&nbsp;
                    <button onClick="javascript:history.go(-1)">취소</button></td>
                </tr>

            </table>
        </selection>
    )
}
export default DeleteBoard;