import * as React from "react";
import { NextPage } from "next";
import { connect } from "react-redux";
import Counter from "../components/Counter/Counter";
import { loadData } from "../store/placeholder/Placeholder.store";
import { increase, increaseBy } from "../store/counter/counter.store";

import Placeholder from "../components/Placeholder/Placeholder";
import withApollo from "../lib/withApollo";
import UserList from "../components/UserList/UserList";
interface StateProps {
  data?: any;
}

interface DispatchProps {
  loadData: () => void;
  increase: () => void;
}

type Props = StateProps & DispatchProps;

const IndexPage: NextPage<Props> = ({ data, loadData, increase }) => {
  React.useEffect(() => {
    increase();
    if (!data) {
      loadData();
    }
    return () => {};
  }, []);
  return (
    <div>
      <Counter />
      <UserList />
    </div>
  );
};

export default withApollo(
  connect(
    ({ placeholder }: { placeholder: any }) => ({
      data: placeholder.data
    }),
    {
      loadData,
      increase
    }
  )(IndexPage)
);