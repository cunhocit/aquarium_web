/* eslint-disable no-unused-vars */
import { faSuperpowers } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLeaf, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
];

export const ContactLayout = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            alert('Bạn chưa nhập đủ thông tin kìa.');
            return;
        }
    
        // Cấu hình tham số template gửi email
        const templateParams = {
            name: name,
            email: email,
            message: message,
            subject: subject
        };

        console.log(templateParams);
        
    
        // Gửi email qua EmailJS
        emailjs
          .send(
            'service_4etgbuk', // Thay bằng ID dịch vụ của bạn
            'template_zcanbt6', // Thay bằng ID mẫu của bạn
            templateParams,
            'R9jzDdRTVv52Pa61w', // pubic key
          )
          .then(
            (response) => {
              setStatus('Email sent successfully!');
              console.log(response);
              setName('');
              setEmail('');
              setMessage('');
              setSubject('');
              if (response.status === 200) {
                alert('Gửi thư thành công!');
              }
            },
            (error) => {
              setStatus('Failed to send email');
              console.log(error);
            }
          );
      };


    return (
        <>
            <div className="-contact-content">
                <div className="-w-contact-left">
                    <div className="-w-contact-h1">
                        <h1>
                            Nếu bạn cần trợ giúp?
                        </h1>
                    </div>
                    <p>+ Hãy liên hệ với chúng tôi để được tư vấn 24/7</p>
                    <p>+ Rất vui lòng được giúp đỡ bạn!</p>
                </div>

                <div className="-w-contact-right">
                    <h1>
                        Thông tin liên hệ
                    </h1>
                    <p>                        
                        <FontAwesomeIcon icon={faPhone} />
                        +84 354 337 115
                    </p>
                    <p>                        
                        <FontAwesomeIcon icon={faEnvelope} />
                        lethanhloi2202@gmail.com
                    </p>

                    <hr />

                    <div className="-w-contact-content-mail">
                        <h4>Gửi tin nhắn</h4>
                        <label htmlFor="">
                            Tên
                            <input type="text" name="" id="" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        
                        <label htmlFor="">
                            Email
                            <input type="mail" name="" id="" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label htmlFor="">
                            Tiêu đề
                            <input type="text" name="" id="" 
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </label>

                        <label htmlFor="">
                            Nội dung
                            <textarea name="" id="" 
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </label>

                        <button className="-w-send-button" onClick={handleSubmit}>Gửi tin</button>
                    </div>
                </div>
            </div>
        </>
    )
}