import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import productThunk from "../../../src/redux/thunk/productThunk";
import {
  AlphaStack,
  Divider,
  Filters,
  IndexTable,
  LegacyCard,
  Page,
  Pagination,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import "../../style.css";

const Product = () => {
  const dispatch = useDispatch();
  const { user, login, error } = useSelector((state) => state.product);
  const [page, setPage] = useState(0);

  const [taggedWith, setTaggedWith] = useState("VIP");
  const [queryValue, setQueryValue] = useState("");
  // console.log(user.data.rows);
  useEffect(() => {
    dispatch(
      productThunk({
        page: page,
        limit: 10,
        queryValue,
      })
    );
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(
      productThunk({
        page: page,
        limit: 10,
        queryValue,
      })
    );
    setPage(0);
  }, [dispatch, queryValue]);

  const productData = user?.data?.rows.map((i) => {
    return {
      id: +i.productId,
      title: i.title,
      product_type: i.product_type,
      handle: i.handle,
      published_scope: i.published_scope,
      status: i.status,
      vendor: i.vendor,
      body_html: i.body_html,
    };
  });
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productData);

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

  const rowMarkup = productData?.map(
    (
      {
        id,
        title,
        product_type,
        handle,
        published_scope,
        status,
        vendor,
        body_html,
      },
      index
    ) => (
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
          <Text as="span">{title}</Text>
        </IndexTable.Cell>

        <IndexTable.Cell>
          <Text as="span">{product_type}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span">{handle}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span">{published_scope}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span">{status}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span">{vendor}</Text>
        </IndexTable.Cell>
        {/* <IndexTable.Cell>
          <Text as="span">
            <div dangerouslySetInnerHTML={{ __html: body_html }} />
          </Text>
        </IndexTable.Cell> */}
      </IndexTable.Row>
    )
  );

  return (
    <>
      <Page title="Products">
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
            itemCount={productData?.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            hasMoreItems
            // promotedBulkActions={promotedBulkActions}
            lastColumnSticky
            headings={[
              { title: "#" },
              { title: "Title" },
              { title: "Product Type" },
              { title: "Handle" },
              { title: "Punlished Scope" },
              { title: "status" },
              { title: "Vendor" },
              // { title: "Description" },
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
        <AlphaStack inlineAlign="center">
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
          
        </AlphaStack>
      </Page>
    </>
  );
};

export default Product;
