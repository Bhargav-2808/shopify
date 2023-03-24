import { Button, Modal, Spinner, TextContainer } from "@shopify/polaris";

import { useState, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalChange, userChange } from "../redux/slices/customerDeleteSlice";
import {
  customerThunk,
  customerDeleteThunk,
} from "../redux/thunk/customerThunk";

const DeleteModel = ({ id }) => {
  const dispatch = useDispatch();

  const { modalOpen, user, loading } = useSelector(
    (state) => state.deleteCustomer
  );

  console.log(modalOpen);

  const handleChange = () => {
    dispatch(modalChange(false));
  };

  const deleteCustomer = () => {
    dispatch(customerDeleteThunk(id));
  };

  if (user) {
    dispatch(
      customerThunk({
        page: 0,
        limit: 8,
        queryValue: "",
      })
    );
    dispatch(modalChange(false));
    dispatch(userChange());
  }

  return (
    <div>
      <Modal
        title="Delete"
        open={modalOpen}
        onClose={handleChange}
        primaryAction={{
          content: loading ? (
            <Spinner accessibilityLabel="Spinner example" size="small" />
          ) : (
            "Delete"
          ),
          onAction: deleteCustomer,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <p>Are you Sure?</p>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default DeleteModel;
