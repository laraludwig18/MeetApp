import styled from 'styled-components/native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.View`
  flex: 1;
  padding: 25px 15px;
`;

export const Form = styled.View`
  margin-bottom: 15px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 8px;
`;

export const LogoutButton = styled(Button).attrs({
  fontStyle: {
    fontSize: 16,
  },
})`
  background: #d44059;
  height: 42px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`;
