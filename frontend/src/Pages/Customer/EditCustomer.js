import {
  Button,
  Form,
  FormLayout,
  Icon,
  Page,
  Spinner,
  TextField,
} from "@shopify/polaris";
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { customerEditThunk } from "../../redux/thunk/customerThunk";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";

const EditCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { user } = useSelector((state) => state.customer);
  const { loading } = useSelector((state) => state.editCustomer);

  const filterData = user?.data?.rows.filter((i) => i.customerId === id)[0];
  const [data, setData] = useState(filterData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.first_name || !data.last_name || !data?.email || !data?.phone) {
      console.log("Enter All Data");
    } else {
      dispatch(
        customerEditThunk({
          id,
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
        title="Edit Customer"
        primaryAction={
          <Button primary onClick={() => nav("/customer")}>
            <Icon source={MobileBackArrowMajor} color="base" />
          </Button>
        }
      >
        <Form>
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
        </Form>
        <br />
        <Button primary type="submit" onClick={handleSubmit}>
          {loading ? (
            <Spinner accessibilityLabel="Spinner example" size="small" />
          ) : (
            "Submit"
          )}
        </Button>
      </Page>
    </>
  );
};

export default EditCustomer;
