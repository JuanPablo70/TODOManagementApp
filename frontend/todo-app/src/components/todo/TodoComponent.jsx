import { useNavigate, useParams } from 'react-router-dom';
import { createTodo, getTodoById, updateTodoById } from './service/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import moment from 'moment';

export default function TodoComponent() {

    const params = useParams();

    const [description, setDescription] = useState('');

    const [targetDate, setTargetDate] = useState('');

    const authContext = useAuth();

    const navigate = useNavigate();

    useEffect( () => getTodo(), [params.id] );

    function getTodo() {
        if (params.id != -1) {
            getTodoById(authContext.username, params.id)
                .then(response => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                })
                .catch(error => console.log('error :>> ', error));
        }
    }

    function onSubmit(values) {
        const todo = {
            id: params.id, 
            username: authContext.username, 
            description: values.description, 
            targetDate: values.targetDate, 
            done: false
        };

        if (params.id == -1) {
            createTodo(authContext.username, todo)
                .then(response => {
                    navigate('/todos');
                })
                .catch(error => console.log('error :>> ', error));
        } else {
            updateTodoById(authContext.username, params.id, todo)
                .then(response => {
                    navigate('/todos');
                })
                .catch(error => console.log('error :>> ', error));
        }
    }

    function validate(values) {
        let errors = {}
        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters!';
        }
        if (values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date!';
        }
        return errors;
    }

    return (
        <div className="container">
            <h1>Todo details</h1>
            <div>
                <Formik initialValues={ {description, targetDate} } 
                    enableReinitialize={true} 
                    onSubmit={onSubmit} 
                    validate={validate} 
                    validateOnChange={false} 
                    validateOnBlur={false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage className="alert alert-warning" name="description" component="div" />
                            <ErrorMessage className="alert alert-warning" name="targetDate" component="div" />

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate" />
                            </fieldset>

                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    );
}