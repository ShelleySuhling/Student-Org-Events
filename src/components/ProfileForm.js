import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'

class ProfileForm extends Component {

    render() {
        let { onSubmit, handleChange, error, user } = this.props
        return (
            <div className="login-container">
                {error ? <Segment inverted color='red' tertiary>{error}</Segment> : null}
                <Form>
                    <Form.Field>
                        <div className="login-form-label">Email</div>
                        <input placeholder='Email' value={user.email} type='email' onChange={handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">Password</div>
                        <input type='password' placeholder='Password' onChange={handleChange} />
                    </Form.Field>
                    <Button type='submit' onClick={onSubmit}>Update</Button>
                </Form>
            </div>
        )
    }
}

export default ProfileForm
