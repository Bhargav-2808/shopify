import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import productThunk from "../../../src/redux/thunk/productThunk";
import {
  AlphaStack,
  Button,
  DataTable,
  Divider,
  Filters,
  Icon,
  IndexTable,
  LegacyCard,
  Page,
  Pagination,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";
import { EditMajor } from "@shopify/polaris-icons";
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
        limit: 8,
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

  const rows = user?.data?.rows.map((i) => {
    return [
      i.title,
      i.product_type,
      i.handle,
      i.published_scope,
      i.status,
      i.vendor,
      <Button primary>
        <Icon source={EditMajor} color="base" />
      </Button>,
      <Button primary>
        <Icon source={DeleteMajor} color="base" />
      </Button>,
    ];
  });

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

  return (
    <>
      <Page title="Products">
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
                "Title",
                "Product Type",
                "Handle",
                "Published Scope",
                "Status",
                "Vendor",
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
    </>
  );
};

export default Product;
