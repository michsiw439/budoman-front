import React, {
  Fragment,
  useState,
  useRef,
  useEffect
} from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { REGISTER_USER } from '../../../graphql/mutations/user.js';
import AvatarsGenerator from '../../../services/AvatarsGenerator.js';
import ValidationRegisterFormHandler from '../../../validators/validationRegisterFormHandler.js';
import FormContainer from '../../reusable/containers/FormContainer.jsx';
import TextInput from '../../reusable/inputs/TextInput.jsx';
import FileInput from '../../reusable/inputs/FileInput.jsx';
import SubmitButton from '../../reusable/buttons/SubmitButton.jsx';
import LoadingModal from '../../reusable/modals/loadingModal.jsx';
import UserRegisteredModal from '../../reusable/modals/userRegisteredModal.jsx';

// I should transmit form with modifier insead add modifier to each element

const Register = () => {
  const blockName = 'register';
  const [avatars, setAvatars] = useState([]);
  const [email, setEmail] = useState('sadasd@gmail.com');
  const [password, setPassword] = useState('Ab7776dsfsd');
  const [userRegisterWithSuccess, setUserRegisterWithSuccess] = useState(false);
  const fileInput = useRef(null);
  const [registerUser, { data, loading }] = useMutation(REGISTER_USER);

  const handleEmailOnChange = (e) => setEmail(e.target.value);
  const handlePasswordOnChange = (e) => setPassword(e.target.value);

  const handleFileOnChange = async (e) => {
    const files = [...e.target.files];
    const avatarsGenerator = new AvatarsGenerator(files);
    const generatedAvatars = await avatarsGenerator.generateAvatars();

    setAvatars(generatedAvatars);
  };

  const resetFormState = () => {
    setAvatars([]);
    setEmail('');
    setPassword('');
    fileInput.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValidator = new ValidationRegisterFormHandler({ password, email, avatars });
    if (!formValidator.call()) return false;

    registerUser({ variables: { input: { email, password, avatars } } });
    resetFormState();

    return true;
  };

  const userRegisteredWithSuccess = data?.user?.id;

  useEffect(() => {
    if (userRegisteredWithSuccess) setUserRegisterWithSuccess(true);
  }, [userRegisteredWithSuccess]);

  return (
    <div className={blockName}>
      <FormContainer
        header={(
          <Fragment>
            <Link to="/login">Logowanie</Link>
            <Link to="/register">
              <span className={`${blockName}__active-link`}> Rejestracja</span>
            </Link>
          </Fragment>
        )}
        form={(
          <Fragment>
            <TextInput
              placeholder="Email"
              classNames="text-input--register"
              onChange={handleEmailOnChange}
              value={email}
            />
            <TextInput
              placeholder="Password"
              classNames="text-input--register"
              onChange={handlePasswordOnChange}
              value={password}
            />
            <FileInput
              classNames="file-input--register"
              onChange={handleFileOnChange}
              ref={fileInput}
            />
            <SubmitButton
              classNames="button--register"
              onMouseDown={handleSubmit}
              value="Załóż konto"
            />
          </Fragment>
        )}
      />
    </div>
  );
};

export default Register;