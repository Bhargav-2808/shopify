import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerThunk } from "../../../src/redux/thunk/customerThunk";
import {
  LegacyCard,
  Pagination,
  Page,
  Icon,
  DataTable,
  Button,
} from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";
import { EditMajor } from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";
import "../../style.css";
import { modalChange } from "../../redux/slices/customerDeleteSlice";
import DeleteModel from "../../components/DeleteModal";

const Customer = () => {
  const [id, setId] = useState(null);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.customer);
  const { modalOpen } = useSelector((state) => state.deleteCustomer);

  const [page, setPage] = useState(0);

  const [taggedWith, setTaggedWith] = useState("VIP");
  const [queryValue, setQueryValue] = useState("");

  useEffect(() => {
    dispatch(
      customerThunk({
        page: page,
        limit: 8,
        queryValue,
      })
    );
  }, [page]);

  const rows = user?.data?.rows.map((i) => {
    return [
      i.first_name,
      i.last_name,
      i.phone,
      i.email,
      i.state,
      <Button primary onClick={() => nav(`/customer/${i.customerId}`)}>
        <Icon source={EditMajor} color="base" />
      </Button>,
      <Button
        primary
        onClick={() => {
          dispatch(modalChange(true));
          setId(i.customerId);
        }}
      >
        <Icon source={DeleteMajor} color="base" />
      </Button>,
    ];
  });

  return (
    <>
      <Page
        title="Customers"
        primaryAction={
          <Button primary onClick={() => nav("/createcustomer")}>
            Add Customer
          </Button>
        }
      >
        <LegacyCard>
          {user?.data && (
            <DataTable
              columnContentTypes={[
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",
              ]}
              headings={[
                "First Name",
                "Last Name",
                "Phone",
                "Email",
                "State",
                "Edit",
                "Delete",
              ]}
              rows={rows}
            />
          )}
        </LegacyCard>
        <br />
        <Pagination
          hasPrevious={page !== 0}
          onPrevious={() => {
            setPage(page - 1);
          }}
          hasNext={page !== user?.totalPage - 1}
          onNext={() => {
            setPage(page + 1);
          }}
        />
      </Page>
      {modalOpen && <DeleteModel id={id} />}
    </>
  );
};

export default Customer;
