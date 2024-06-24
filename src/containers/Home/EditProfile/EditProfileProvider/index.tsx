import {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import * as Yup from 'yup';
import {useFormik, type FormikHandlers} from 'formik';
import {useDispatch} from 'react-redux';

import type {CheckBoxGroupRef} from '../../../../components/CheckboxGroup';
import type {RoundedCheckBoxGroupRef} from '../../../../components/RoundedCheckBoxGroup';
import type {IUserData} from '../../../../@types';
import {updateUserRequested} from '../../../../redux/actions/user.actions';

type RefKeys = keyof Pick<
  IUserData,
  'outfitSelection' | 'preferredBrands' | 'preferredColors' | 'preferredSizes'
>;

interface EditProfileContextValue {
  addInputRef: (
    key: RefKeys,
    ref: CheckBoxGroupRef | RoundedCheckBoxGroupRef,
  ) => void;
  personalInfoState: {
    handleChange: FormikHandlers['handleChange'];
    values: IPersonalInfoState;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    isValid: boolean;
  };
  currentTabState: {
    currentTab: number;
    setCurrentTab: (index: number) => void;
  };
  handleSaveUserInformation: () => void;
}

const EditProfileContext = createContext<EditProfileContextValue | undefined>(
  undefined,
);
interface EditProfileContextProviderProps {
  children: ReactNode;
}

const PersonalInfoScheme = Yup.object().shape({
  name: Yup.string().min(2),
  address: Yup.string(),
});

export interface IPersonalInfoState {
  name: string;
  address: string;
}

export const EditProfileContextProvider = ({
  children,
}: EditProfileContextProviderProps) => {
  const choicesRef = useRef<
    Map<RefKeys, CheckBoxGroupRef | RoundedCheckBoxGroupRef>
  >(new Map());

  const {handleChange, values, errors, touched, isValid, handleSubmit} =
    useFormik<IPersonalInfoState>({
      initialValues: {name: '', address: ''},
      onSubmit,
      validationSchema: PersonalInfoScheme,
    });

  const [currentTab, setCurrentTab] = useState(0);

  const dispatch = useDispatch();

  const personalInfoState = {
    handleChange,
    values,
    errors,
    touched,
    isValid,
  };

  const currentTabState = {
    currentTab,
    setCurrentTab,
  };

  const addInputRef = useCallback(function (
    key: RefKeys,
    ref: CheckBoxGroupRef | RoundedCheckBoxGroupRef,
  ) {
    choicesRef.current.set(key, ref);
  },
  []);

  function onSubmit(formValues: IPersonalInfoState) {
    const {name, address} = formValues;

    const payload = {
      name,
      address,
    };

    dispatch(updateUserRequested(payload));
  }

  const handleSaveUserChoices = useCallback(() => {
    const payload: Partial<Record<RefKeys, any>> = {};

    for (const [key, mapValue] of choicesRef.current.entries()) {
      payload[key] = mapValue.value;
    }

    dispatch(updateUserRequested(payload));
  }, []);

  const handleSaveUserInformation = useCallback(() => {
    currentTab === 0 ? handleSaveUserChoices() : handleSubmit();
  }, [currentTab, handleSubmit]);

  return (
    <EditProfileContext.Provider
      value={{
        addInputRef,
        personalInfoState,
        currentTabState,
        handleSaveUserInformation,
      }}>
      {children}
    </EditProfileContext.Provider>
  );
};

export const useEditProfileContext = () => {
  const context = useContext(EditProfileContext);
  if (context === undefined) {
    throw new Error(
      'useEditProfileContext must be used within a EditProfileContextProvider',
    );
  }
  return context;
};
