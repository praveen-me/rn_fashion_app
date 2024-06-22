import {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import type {CheckBoxGroupRef} from '../../../../components/CheckboxGroup';
import type {RoundedCheckBoxGroupRef} from '../../../../components/RoundedCheckBoxGroup';
import type {IUserData} from '../../../../@types';

import {useFormik} from 'formik';

import * as Yup from 'yup';

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
    handleChange: (field: string) => (value: string) => void;
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
  name: Yup.string().email('Invalid email').min(2),
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
  function addInputRef(
    key: RefKeys,
    ref: CheckBoxGroupRef | RoundedCheckBoxGroupRef,
  ) {
    choicesRef.current.set(key, ref);
  }

  const {handleChange, values, errors, touched, isValid} =
    useFormik<IPersonalInfoState>({
      initialValues: {name: '', address: ''},
      onSubmit,
      validationSchema: PersonalInfoScheme,
    });

  const [currentTab, setCurrentTab] = useState(0);

  const personalInfoState = {
    handleChange: (field: string) => (value: string) =>
      handleChange(field)(value),
    values,
    errors,
    touched,
    isValid,
  };

  const currentTabState = {
    currentTab,
    setCurrentTab,
  };

  function onSubmit(formValues: IPersonalInfoState) {
    if (isValid) {
      const {name, address} = formValues;

      const payload = {
        name,
        address,
      };

      console.log({payload});

      // dispatch(signupRequested(payload));
    }
  }

  function handleSaveUserChoices() {
    // return values in a object format
    const payload: Partial<Record<RefKeys, any>> = {};

    for (const [key, mapValue] of choicesRef.current.entries()) {
      payload[key] = mapValue.value;
    }

    console.log({payload});
  }

  function handleSaveUserInfo() {
    console.log(values);
  }

  const handleSaveUserInformation = useCallback(() => {
    if (currentTab === 0) {
      handleSaveUserChoices();
    } else {
      handleSaveUserInfo();
    }
  }, [currentTab]);

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
