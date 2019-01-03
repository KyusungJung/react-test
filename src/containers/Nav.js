import { connect } from "react-redux";
import Nav from "../components/Nav";

const mapStateToProps = state => ({
  categories: state.users.categories
});

export default connect(mapStateToProps)(Nav);
