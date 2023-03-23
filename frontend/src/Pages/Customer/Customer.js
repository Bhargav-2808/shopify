import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import customerThunk from "../../../src/redux/thunk/customerThunk";
import {
  TextField,
  IndexTable,
  LegacyCard,
  Filters,
  Select,
  useIndexResourceState,
  Text,
  Pagination,
  Page,
} from "@shopify/polaris";
import "../../style.css";

const Customer = () => {
  const dispatch = useDispatch();
  const { user, login, error } = useSelector((state) => state.customer);
  const [page, setPage] = useState(0);

  const [taggedWith, setTaggedWith] = useState("VIP");
  const [queryValue, setQueryValue] = useState("");
  useEffect(() => {
    dispatch(
      customerThunk({
        page: page,
        limit: 10,
        queryValue,
      })
    );
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(
      customerThunk({
        page: page,
        limit: 10,
        queryValue,
      })
    );
    setPage(0);
  }, [dispatch, queryValue]);

  const customerData = user?.data?.rows.map((i) => {
    return {
      id: +i.customerId,
      first_name: i.first_name,
      last_name: i.last_name,
      phone: i.phone,
      email: i.email,
      state: i.state,
    };
  });
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customerData);
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const handleTaggedWithRemove = useCallback(
    () => setTaggedWith(undefined),
    []
  );
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const filters = [
    {
      key: "taggedWith",
      label: "Tagged with",
      shortcut: true,
    },
  ];

  const rowMarkup = customerData?.map(
    ({ id, first_name, last_name, phone, state, email }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text fontWeight="bold" as="span">
            {index + 1}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span">{first_name}</Text>
        </IndexTable.Cell>

        <IndexTable.Cell>
          <Text as="span">{last_name}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span">{phone}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span">{state}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span">{email}</Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <>
      <Page title="Customers">
        <LegacyCard>
          <div style={{ padding: "16px", display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Filters
                queryValue={queryValue}
                filters={filters}
                onQueryChange={setQueryValue}
                onQueryClear={handleQueryValueRemove}
                onClearAll={handleClearAll}
              />
            </div>
          </div>
          <IndexTable
            resourceName={resourceName}
            itemCount={customerData?.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            hasMoreItems
            // promotedBulkActions={promotedBulkActions}
            lastColumnSticky
            headings={[
              { title: "#" },
              { title: "First Name" },
              { title: "Last Name" },
              { title: "Phone" },
              { title: "State" },
              { title: "Email" },
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>

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
    </>
  );
};

export default Customer;
