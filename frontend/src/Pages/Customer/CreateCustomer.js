import React, { useState } from "react";
import {
  Form,
  Button,
  TextField,
  Page,
  ButtonGroup,
  FormLayout,
  Icon,
  Spinner,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import { useDispatch, useSelector } from "react-redux";
import { addCustomerThunk } from "../../redux/thunk/customerThunk";

const CreateCustomer = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const nav = useNavigate();
  const { loading } = useSelector((state) => state.createCustomer);

  //   const [address, setAddress] = useState([
  //     {
  //       address1: "",

  //       address2: "",

  //       city: "",

  //       country: "",

  //       zip: "",
  //     },
  //   ]);

  //   const addAddress = () => {
  //     const addAddress = {
  //       address1: "",
  //       address2: "",
  //       city: "",
  //       country: "",

  //       zip: "",
  //     };

  //     setAddress([...address, addAddress]);

  //     console.log(address);
  //   };
  //   const handleAddressChange = (index, name, event) => {
  //     console.log(name, event, index);

  //     const updatedAddress = [...address];

  //     updatedAddress[index] = {
  //       ...updatedAddress[index],

  //       [name]: event,
  //     };

  //     setAddress(updatedAddress);
  //   };

  //   const deleteAddress = () => {
  //     if (address.length == 1) {
  //       console.log("One Address is Mandetory");
  //     } else {
  //       const newAddress = address.slice(0, address.length - 1);

  //       setAddress(newAddress);
  //     }
  //   };

  const handleSubmit = () => {
    if (!data.first_name || !data.last_name || !data?.email || !data?.phone) {
      console.log("Enter Data Properly.");
    } else {
      dispatch(
        addCustomerThunk({
          data,
          cb: () => {
            nav("/customer");
          },
        })
      );
    }
  };
  return (
    <>
      <Page
        title="Create Customer"
        primaryAction={
          <Button primary onClick={() => nav("/customer")}>
            <Icon source={MobileBackArrowMajor} color="base" />
          </Button>
        }
      >
        <Form onSubmit={handleSubmit}>
          {" "}
          <FormLayout.Group>
            <TextField
              label="First Name"
              type="text"
              name="first_name"
              value={data?.first_name}
              onChange={(e) => setData({ ...data, ["first_name"]: e })}
            />
            <TextField
              label="Last Name"
              type="text"
              name="last_name"
              value={data?.last_name}
              onChange={(e) => setData({ ...data, ["last_name"]: e })}
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={data?.email}
              autoComplete="email"
              onChange={(e) => setData({ ...data, ["email"]: e })}
            />
            <TextField
              label="Phone Number"
              type="text"
              name="phoneNumber"
              value={data?.phone}
              onChange={(e) => setData({ ...data, ["phone"]: e })}
            />
          </FormLayout.Group>
          <br />
          <Button primary onClick={handleSubmit}>
            {loading ? (
              <Spinner accessibilityLabel="Spinner example" size="small" />
            ) : (
              "Create Customer"
            )}
          </Button>
        </Form>
      </Page>
    </>
  );
};

export default CreateCustomer;
