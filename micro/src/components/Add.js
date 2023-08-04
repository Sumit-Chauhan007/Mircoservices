import axios from 'axios';
import React, { useState } from 'react'

const Add = () => {
    const [name, setPostName] = useState("");
    const [title, setPostTitle] = useState("");
    const [image, setPostImage] = useState("");
    const [registerError, setRegisterError] = useState("");
    const handlePost = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('title', title);
            formData.append('image', image); // 'image' should match the name attribute of the file input

            const response = await axios.post("http://127.0.0.1:8000/api/auth/post-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file upload
                    // Your other headers here (do not include 'Content-type' and CORS-related headers here)
                },
            });

            console.log(name);
            console.log(title);
            setRegisterError(" ");
            var registerCloseButton = document.getElementById("registerClose");
            var logInOpenButton = document.getElementById("logInOpen");
            registerCloseButton.click();
        } catch (error) {
            // Error handling code remains the same
        }
    };


    return (
        <div>
            <div
                className="modal fade"
                id="RegisterPostModal"
                tabindex="-1"
                aria-labelledby="RegisterPostModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="RegisterPostModalLabel">
                                Modal title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id="registerClose"
                            ></button>
                        </div>
                        <form onSubmit={handlePost}>
                            <div className="modal-body">
                                <div align="right" id="error">
                                    {" "}
                                    {registerError}
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        Post Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        value={title}
                                        onChange={(e) => setPostTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        Post Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        value={name}
                                        onChange={(e) => setPostName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        Post Image
                                    </label>
                                    <input
                                        type="file"
                                        accept='image/*'
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        
                                        onChange={(e) => setPostImage(e.target.files[0])}
                                    />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="Submit" className="btn btn-primary">
                                    submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add