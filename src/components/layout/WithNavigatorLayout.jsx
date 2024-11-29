import NavigatorLayout from "./NavigatorLayout";

const WithNavigatorLayout = (WrappedComponent) => {
  return function hoc(props) {
    return (
      <NavigatorLayout>
        <WrappedComponent {...props} />
      </NavigatorLayout>
    );
  };
};

export default WithNavigatorLayout;
