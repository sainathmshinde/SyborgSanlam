import AppLayout from "./AppLayout";

const WithLayout = (type) => (WrappedComponent) => {
  return function hoc(props) {
    return (
      <AppLayout>
        <WrappedComponent {...props} type={type} />
      </AppLayout>
    );
  };
};

export default WithLayout;
