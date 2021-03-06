import React, { Component, Fragment } from "react";
import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";
import Swal from "sweetalert2";
class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        maLoaiNguoiDung: "",
        maNhom: "",
        email: "",
      },
      errors: {
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        maLoaiNguoiDung: "",
        maNhom: "",
        email: "",
      },
      valids: {
        taiKhoan: false,
        matKhau: false,
        hoTen: false,
        soDT: false,
        maLoaiNguoiDung: false,
        maNhom: false,
        email: false,
        form: false,
      },
      statusSave: false,
      statusFromAPI: false,
    };
  }
  componentDidUpdate(nextProps) {
    let { accountInfo } = this.props;
    if (accountInfo !== nextProps.accountInfo) {
      this.setState({
        values: {
          taiKhoan: accountInfo.taiKhoan,
          matKhau: accountInfo.matKhau,
          hoTen: accountInfo.hoTen,
          soDT: accountInfo.soDT,
          maLoaiNguoiDung: accountInfo.maLoaiNguoiDung,
          maNhom: accountInfo.maNhom,
          email: accountInfo.email,
        },
        statusFromAPI: JSON.parse(localStorage.getItem("isPutSuccess")),
      });
    }
  }
  handleOnEdit = () => {
    let a = document.getElementsByClassName("form-control");
    for (let i = 1; i < a.length; i++) {
      a[i].removeAttribute("disabled");
    }

    this.setState({
      statusSave: true,
      statusFromAPI: false,
      valids: {
        taiKhoan: true,
        matKhau: true,
        hoTen: true,
        soDT: true,
        maLoaiNguoiDung: true,
        maNhom: true,
        email: true,
        form: true,
      },
    });
  };
  handleOnChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };

  handleErrors = (e) => {
    let { name, value, placeholder } = e.target;
    let { errors, valids } = this.state;
    let isValid = false;
    let massage = value === "" ? placeholder + " kh??ng ???????c r???ng" : "";
    isValid = massage !== "" ? false : true;
    if (value !== "") {
      switch (name) {
        case "taiKhoan":
          if (value.length < 4 || value.length > 9) {
            isValid = false;
            massage = placeholder + "ph???i c?? ????? d??i t??? 4 ?????n 9 k?? t???.";
          } else if (!value.match("^[a-z0-9_-]{3,16}$")) {
            isValid = false;
            massage = placeholder + "kh??ng ????ng ?????nh d???ng.";
          }
          break;
        case "matKhau":
          if (value.length < 6 || value.length > 12) {
            isValid = false;
            massage = placeholder + "ph???i c?? ????? d??i t??? 6 ?????n 12 k?? t???.";
          } else if (!value.match("^[a-zA-Z0-9]+$")) {
            isValid = false;
            massage = placeholder + "kh??ng ????ng ?????nh d???ng.";
          }

          break;
        case "hoTen":
          if (
            !value.match(
              "^[a-zA-Z_????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" +
                "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" +
                "????????????????????????????????????????????????????????\\s]+$"
            )
          ) {
            isValid = false;
            massage = placeholder + "kh??ng ????ng ?????nh d???ng.";
          }
          break;
        case "soDT":
          if (!value.match("^[0-9]*$")) {
            isValid = false;
            massage = placeholder + "kh??ng ????ng ?????nh d???ng.";
          }
          break;
        case "email":
          if (
            !value.match(
              "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
                "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
            )
          ) {
            isValid = false;
            massage = placeholder + "kh??ng ????ng ?????nh d???ng.";
          }
          break;
        default:
          break;
      }
    }

    this.setState(
      {
        errors: { ...errors, [name]: massage },
        valids: { ...valids, [name]: isValid },
      },
      () => {
        this.formValidation();
      }
    );
  };
  formValidation = () => {
    let { valids } = this.state;
    this.setState({
      valids: {
        ...valids,
        form:
          valids.taiKhoan &&
          valids.matKhau &&
          valids.hoTen &&
          valids.soDT &&
          valids.email,
      },
    });
  };
  handleOnSave = () => {
    this.state.valids.form === true
      ? this.props.UpdateUserProfile(this.state.values)
      : Swal.fire({
          position: "center",
          icon: "error",
          html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>VUI L??NG KI???M TRA L???I TH??NG TIN</b>`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.setState({
            statusSave: true,
          });
        });
  };
  handleOnCancel = () => {
    let accountInfo = this.props.accountInfo;
    this.setState({
      statusSave: false,
      values: {
        taiKhoan: accountInfo.taiKhoan,
        matKhau: accountInfo.matKhau,
        hoTen: accountInfo.hoTen,
        soDT: accountInfo.soDT,
        maLoaiNguoiDung: accountInfo.maLoaiNguoiDung,
        maNhom: accountInfo.maNhom,
        email: accountInfo.email,
      },
    });
    let a = document.getElementsByClassName("form-control");
    for (let i = 1; i < a.length; i++) {
      a[i].setAttribute("disabled", true);
    }
  };
  render() {
    let { errors } = this.state;
    return (
      <Fragment>
        <form className="AccountInfo">
          <div className="form-group">
            <label>T??n t??i kho???n </label>
            <input
              type="text"
              name="taiKhoan"
              className="form-control effect-7"
              placeholder="T??n t??i kho???n "
              aria-describedby="helpId"
              value={this.state.values.taiKhoan}
              onChange={this.handleOnChange}
              disabled
            />
          </div>
          <input type="password" className="form-control d-none" />
          <div className="form-group">
            <label>M???t kh???u </label>
            <input
              type="password"
              name="matKhau"
              className="form-control"
              placeholder="M???t Kh???u "
              aria-describedby="helpId"
              value={this.state.values.matKhau}
              onChange={this.handleOnChange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              disabled
            />

            {errors.matKhau !== "" ? (
              <div className="massage-error">{errors.matKhau}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>T??n ng?????i d??ng </label>
            <input
              type="text"
              name="hoTen"
              className="form-control"
              placeholder="T??n ng?????i d??ng "
              aria-describedby="helpId"
              value={this.state.values.hoTen}
              onChange={this.handleOnChange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              disabled
            />
            {errors.hoTen !== "" ? (
              <div className="massage-error">{errors.hoTen}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>S??? ??i???n tho???i </label>
            <input
              type="text"
              name="soDT"
              className="form-control"
              placeholder="S??? ??i???n tho???i "
              aria-describedby="helpId"
              value={this.state.values.soDT}
              onChange={this.handleOnChange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              disabled
            />
            {errors.soDT !== "" ? (
              <div className="massage-error">{errors.soDT}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>Email </label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email "
              aria-describedby="helpId"
              value={this.state.values.email}
              onChange={this.handleOnChange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              disabled
            />
            {errors.email !== "" ? (
              <div className="massage-error">{errors.email}</div>
            ) : (
              ""
            )}
          </div>
        </form>
        <div className="button">
          {this.state.statusSave === true &&
          this.state.statusFromAPI === false ? (
            <div>
              <button className="btn--red mr-1" onClick={this.handleOnCancel}>
                H???y thay ?????i
              </button>
              <button className="btn--purple" onClick={this.handleOnSave}>
                L??u thay ?????i
              </button>
            </div>
          ) : (
            <button className="btn--blue" onClick={this.handleOnEdit}>
              S???a th??ng tin
            </button>
          )}
        </div>
      </Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateUserProfile: (data) => {
      dispatch(actions.actPUTinfoAccount(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    dataAccount: state.NguoiDungReducer.accountInfo,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
