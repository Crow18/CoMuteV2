import React, { useEffect, useState, useRef } from 'react';
import useHttp from '../../Hooks/useHttp';
import useLocalStorage from '../../Hooks/useLocalStorage';
import {Page, PageHeader, PageContainer, PageItemContainer, PageSegmentContainer, PageSegment } from '../../Styled/Page.elements';
import {BaseButton, BaseInput, BaseLabel} from '../../Styled/Utils/Base.elements';
import Loading from '../Shared/Loading';
import {useModal} from '../../Context/ModalContext';

const Profile = () => {
  const [doRequest, loading] = useHttp();
  const [doSaveRequest, loadingSave] = useHttp();
  const [profileDetails, setProfileDetails] = useState({});
  const [getLocalStorageItem] = useLocalStorage();
  const modal = useModal();

  const nameRef = useRef();
  const surnameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();


  const userData = getLocalStorageItem("userData");

  useEffect(()=> {
    doFetchProfile();
  },[]);

  const doFetchProfile = async() => {
    const profile = await doRequest(process.env.REACT_APP_GETUSERPROFILE_ENDPOINT + userData.userID, 'GET', '', userData.token);
    if(profile.error.length > 0)
    {
      modal.setNotification("Error", profile.error);
    }
    setProfileDetails(profile.data);
  }

  const doSave = async() => {
    const profileData = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    console.log(profileData);
    const saveResponse = await doSaveRequest(process.env.REACT_APP_UPDATEUSERPROFILE_ENDPOINT + userData.userID, 'PUT', JSON.stringify(profileData), userData.token);

    if(saveResponse.error.length > 0)
    {
      return modal.setNotification("Error", saveResponse.error);
    }
    modal.setNotification("Profile updated", "Your Profile has been updated successfully");
  }

  return (
    <Page>
      <PageHeader>Profile</PageHeader>
      <PageContainer>
        {
          loading ? <Loading /> :
          <PageItemContainer>
          <PageSegmentContainer>

            <PageSegment>
              <BaseLabel>Name</BaseLabel>
              <BaseInput defaultValue={profileDetails.name} name="name" ref={nameRef}/>
            </PageSegment>

            <PageSegment>
              <BaseLabel>Surname</BaseLabel>
              <BaseInput defaultValue={profileDetails.surname} name="surname" ref={surnameRef}/>
            </PageSegment>

            <PageSegment>
              <BaseLabel>Phone</BaseLabel>
              <BaseInput defaultValue={profileDetails.phone} name="phone" ref={phoneRef}/>
            </PageSegment>

            <PageSegment>
              <BaseLabel>Email</BaseLabel>
              <BaseInput defaultValue={profileDetails.email} name="email" ref={emailRef}/>
            </PageSegment>

            <PageSegment>
              <BaseLabel>Password</BaseLabel>
              <BaseInput placeholder="**********" name="password" ref={passwordRef}/>
            </PageSegment>

            {
              loadingSave ? <Loading /> :
              <PageSegment>
                <BaseButton onClick={async() => {await doSave()}}>Save</BaseButton>
              </PageSegment>
            }
          </PageSegmentContainer>
          </PageItemContainer>
        }
      </PageContainer>
    </Page>
  )
}

export default Profile