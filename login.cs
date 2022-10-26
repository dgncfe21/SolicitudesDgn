@using System
@using System.Data
@using System.Data.SqlClient
@{
    var db1 = Database.Open("sire");
    var db2 = Database.Open("Directorio");
    var rpe = Request.Form["rpe"];
    var pass = Request.Form["pass"];
    var nivelpag = "";
    var nivelzona = "";
    var error = "";
    string strpopup = "";
    var mensajesalida = "";
    if (IsPost)
    {
        var dp = db2.QuerySingle("select * from Direc.Personal where RPE =  '" + rpe + "' and Contraseña = '" + pass + "'");
        if (dp != null)
        {
            string str1 = dp.nombres.Trim() + " " + dp.ap_pat.Trim() + " " + dp.ap_mat.Trim();
            //Response.Cookies["SiresK"]["RPE"] = dp.rpe;
            //Response.Cookies["SiresK"]["clvzona"] = dp.clvzona;
            //Response.Cookies["SiresK"]["correo"] = dp.correo_int;
            //Response.Cookies["SiresK"]["empleado"] = str1;
            var bnivel = db1.QuerySingle("select rpe, nombre, cve, nivel, acco from Usuarios where rpe ='" + dp.rpe + "'");
            if (bnivel != null)
            {
                Response.Cookies["SiresK"]["cookiename"] = "SiresK";
                Response.Cookies["SiresK"]["RPE"] = bnivel.rpe;
                Response.Cookies["SiresK"]["clvzona"] = bnivel.cve;
                Response.Cookies["SiresK"]["correo"] = dp.correo_int;
                Response.Cookies["SiresK"]["empleado"] = bnivel.nombre;
                Response.Cookies["SiresK"]["zona"] = bnivel.cve;
                Response.Cookies["SiresK"]["acco"] = bnivel.acco;
                switch (nivelpag)
                {
                    case "AUXADM":
                        Response.Redirect("SolicitudCap.cshtml");
                        break;
                    case "ADMINA":
                        if (nivelzona == "Z")
                        {
                            Response.Redirect("CapturaDisp.cshtml");
                        }
                        else if (nivelzona == "A")
                        {
                            Response.Redirect("CargaGas.cshtml");
                        }
                        else
                        {
                            Response.Redirect("Cards.cshtml");
                        }
                        break;
                    case "ADMINZ":
                        Response.Redirect("SolicitudCap.cshtml");
                        break;
                    //case "AUXCON":
                    //    Response.Redirect("ProcesoFact.cshtml");
                    //    break;
                    //case "AUXREV":
                    //    Response.Redirect("ProcesoFact.cshtml");
                    //    break;
                    //case "AUXPAG":
                    //    Response.Redirect("ProcesoFact.cshtml");
                    //    break;
                    default:
                        Response.Redirect("Cards.cshtml");
                        break;
                }
            }
            else
            {
                error = "error";
                mensajesalida = "No se encuentra un acceso valido favor de verificar.";
                strpopup = "mensajeerror('" + error + "', '" + mensajesalida + "', '', 'Verificar Error');";

            }
        }
        else
        {
            error = "error";
            mensajesalida = "No se encuentra un acceso valido favor de verificar.";
            strpopup = "mensajeerror('" + error + "', '" + mensajesalida + "', '', 'Sin Acceso');";
        }
    }

}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>CONTROL-VEH</title>
    <title>Zona Poniente</title>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, IE=11, IE=10, IE=9" />
    <link rel="shortcut icon" href="~/favicon.ico" type="image/x-icon" />

    @*<link rel="stylesheet" href="http://appni.cfemex.com/cdn/themes/Admin/admincfe.css" />*@
    <link rel="stylesheet" href="http://proadmin.cfemex.com/cdn/themes/Admin/admincfe.css" />
    <style>
        .divContenido {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 500px;
            height: 300px;
            margin: auto;
        }

        .loginheader, h4 {
            color: white !important;
            text-align: center;
            font-size: 30px;
            padding: 15px 25px;
        }

        .divfooter {
            background-color: #f9f9f9;
            text-align: center;
        }

        .modalcorrecto {
            background-color: #0480be;
            color: white;
        }

        .modalerror {
            background-color: #f70e0e;
            color: white;
        }

        .modalwarning {
            background-color: #f2bf44;
            color: black;
        }

    </style>
</head>
@{
    if (error == "error")
    {
        @Helper.ErrorModal(mensajesalida);
    }
    else if (error == "correcto en BD")
    {
        @Helper.CorrectoModal(mensajesalida);
    }
}
<body style="background-image: url('Images/mgbg.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center center; background-attachment: fixed;">
    <div class="animated bounceInUp">
        <div class="login-box">
            <div class="login-logo">
                <a href="#"><b> Control de Vehiculos </b></a>
            </div>
            <!-- /.login-logo -->
            <div class="login-box-body">
                <p class="login-box-msg">Ingresa credenciales de CFEmpleado</p>

                <div>
                    <form method="post">

                        <div class="form-group has-feedback">
                            <input type="text" class="form-control" placeholder="Usuario" id="rpe" name="rpe" />
                        </div>
                        <div class="form-group has-feedback">
                            <input type="password" class="form-control" placeholder="Contraseña" id="pass" name="pass" />
                        </div>
                        <div class="row">

                            <div class="col-xs-4 pull-right">
                                <button type="submit" class="btn btn-primary btn-block"><span class="glyphicon glyphicon-off"></span> Ingresar</button>
                            </div>
                            <!-- /.col -->
                        </div>
                        <input id="txterror" name="txterror" type="text" value="@error" hidden />
                    </form>
                </div>
            </div>
            <!-- /.login-box-body -->
        </div>
        <!-- /.login-box -->
    </div>
    <div id="modalMensaje" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content" id="modclass">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="modaltit"><strong></strong></h4>
                </div>
                <form method="post">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="control-label" id="labelmsg"></label>
                        </div>
                    </div>
                    <div id="modalfoot" class="modal-footer" hidden>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- jQuery 1.11.1 -->
    <script src="http://proadmin.cfemex.com/cdn/jquery/1.11.1/jquery.min.js"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="http://proadmin.cfemex.com/cdn/jquery-ui/jquery-ui.min.js"></script>
    <script src="http://proadmin.cfemex.com/cdn/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script>


    </script>
</body>
</html>
