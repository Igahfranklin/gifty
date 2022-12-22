import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import CenteredLayout from "../../layouts/CenteredLayout";
import { Spinner } from "../../components/Spinner";
import { urls, apiUrls } from "../../utils/urls";
import { baseConfig as config } from "../../utils/apiCalls";
import ErrorPage from "../../components/ErrorPage";

export default function IgAuth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [err, setErr] = useState();

  const code = searchParams.get("code");
  const state = JSON.parse(searchParams.get("state"));

  const navigate = useNavigate();

  const url = "https://" + window.location.host + window.location.pathname;

  useEffect(() => {
    if (code && state) {
      (async () => {
        try {
          await axios
            .get(apiUrls.authIg(state.slug), {
              ...config,
              params: {
                code,
                redirect_uri: url,
              },
            })
            .then((res) => {
              return navigate(urls.enterBankInfo(state.slug), {
                state: {
                  otp: res.data.data.code,
                },
              });
            })
            .catch((err) => {
              if (err.response.status === 400) {
                console.log(err);
              } else if (err.response.status === 404) {
                setErr("Gift not found");
              } else {
                console.log(err);
              }
            });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [code, state]);

  if (err) return <ErrorPage text={err} />;

  return (
    <>
      <Header>Verifying</Header>
      <CenteredLayout>
        <div className="w-full bg-lavenderBlush rounded-[10px] p-5 flex justify-center">
          <Spinner />
        </div>
      </CenteredLayout>
    </>
  );
}
