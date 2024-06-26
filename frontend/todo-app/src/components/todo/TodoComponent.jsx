import { useNavigate, useParams } from 'react-router-dom';
import { getTodoById, updateTodoById } from './service/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';

export default function TodoComponent() {

    const params = useParams();

    const [description, setDescription] = useState('');

    const [targetDate, setTargetDate] = useState('');

    const authContext = useAuth();

    const navigate = useNavigate();

    useEffect( () => getTodo(), [params.id] );

    function getTodo() {
        getTodoById(authContext.username, params.id)
            .then(response => {
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
            })
            .catch(error => console.log('error :>> ', error));
    }

    function onSubmit(values) {
        const todo = {
            id: params.id, 
            username: authContext.username, 
            description: values.description, 
            targetDate: values.targetDate, 
            done: false
        };

        updateTodoById(authContext.username, params.id, todo)
            .then(response => {
                console.log('response :>> ', response);
                }
            )
            .catch(error => console.log('error :>> ', error));
        
        navigate('/todos');
    }

    function validate(values) {
        let errors = {}
        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters!';
        }
        if (values.targetDate == null) {
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