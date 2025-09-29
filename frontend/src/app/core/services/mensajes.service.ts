import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  //#region General
  tituloSuccess: string = '!Ok!';
  mensajeSuccess: string = 'El proceso se realizó con éxito.';
  mensajeSuccessCampana: string = 'La campaña se registró con éxito. ¿Desea ir a conjunto de anuncios?';
  mensajeSuccessConjuntoAnuncio: string = 'El conjunto de anuncio se registró con éxito. ¿Desea ir a anuncios?';
  mensajeSuccessUpdateConjuntoAnuncio: string = 'El conjunto de anuncio se actualizó con éxito. ¿Desea ir a anuncios?';

  tituloEliminarRegistro: string = '¿Esta seguro de eliminar el registro?';
  mensajeEliminarRegistro: string = 'El registro será eliminado.';

  tituloError: string = '!Error!';
  mensajeCamposObligatorios: string = 'Hay campos obligatorios';
  mensajeCamposEdadMaxMenorEdadMin: string = 'La edad máxima no puede ser menor que la edad mínima, se colocará la edad máxima.';
  mensajeCamposDescripcionAnuncio: string = 'Las descripciones no pueden ser iguales';
  mensajeCamposTituloAnuncio: string = 'Los títulos no pueden ser iguales';
  mensajeCamposObligatoriosSegmentoRedesSociales: string = 'Verifique los campos en rojo en la lista de redes sociales.';

  tituloNoBusqueda: string = '¡Error en la búsqueda!';
  MensajeNoBusqueda: string = 'No se puedo encontrar datos, con los criterios de búsqueda.';

  tituloErrorBusqueda: string = '¡Error en la búsqueda!';
  MensajeUnoCriterioErrorBusqueda: string = 'Debe ingresar por lo menos 1 criterio de búsqueda.';
  MensajeErrorBusquedaFechaInicioFin: string = 'Debe ingresar fecha inicial y fecha final.';
  MensajeErrorBusquedaFechaMayor: string = 'La fecha de inicio no puede ser mayor que la fecha de fin.';
  MensajeErrorBusquedaEquipoUsuario: string = 'No se ha seleccionado ningun equipo usuario.';
  MensajeIntentarNuevoErrorBusqueda: string = 'Por favor intente de nuevo.';

  tituloNoInformacionBusqueda: string = '¡No se encontró información!';
  MensajeNoInformacionBusqueda: string = 'Intente con otros criterios de búsqueda.';

  tituloDesactivarRegistro: string = '¿Esta seguro de desactivar el registro?';
  mensajeDesactivarRegistro: string = 'El registro será desactivado.';

  tituloDesactivarLanding: string = '¿Esta seguro de desactivar el landing page?';
  mensajeDesactivarLanding: string = 'El landing page será desactivado.';

  tituloErrorCargarConfiguracion: string = '¡Error en el proceso!';
  mensajeErrorCargarConfiguracion: string = 'No se pudo cargar la configuración. Inténtalo de nuevo más tarde.';
  mensajeErrorCargarFiltrosBusqueda: string = 'No se pudo cargar los filtros de búsqueda. Inténtalo de nuevo más tarde.';

  tituloErrorMayorEdad: string = '¡Error en la edad!';
  mensajeErrorMayorEdad: string = 'La persona no es mayor de edad.';
  mensajeErrorMayorEdadMedicoAsistente: string = 'El médico asistente no es mayor de edad.';
  mensajeErrorMayorEdadContacto: string = 'La persona de contacto no es mayor de edad.';
  tituloDesactivarAutomatizacion: string = '¿Esta seguro de desactivar la automatización?';
  mensajeDesactivarAutomatizacion: string = 'La automatización será desactivado.';

  tituloInformacionClave: string = '¡Modificar clave!';
  mensajeInformacionClave: string = '¿Desea ingresar una clave nueva?';

  tituloNoEliminarProducto: string = '¡No se puede eliminar el producto!';
  MensajeNoEliminarProducto: string = 'El producto está asociado a los siguientes origenes:';

  tituloNoEliminarOrigen: string = '¡No se puede eliminar el origen!';
  MensajeNoEliminarOrigen: string = 'El origen está asociado a uno o varios contactos.';

  tituloNoEliminar: string = '¡No se puede eliminar el registro!';
  MensajeNoEliminarFaseVenta: string = 'La Fase venta está asociado a una o varias oportunidades.';
  MensajeErrorAreaSistemas: string = 'Por favor intente de nuevo, si el problema persiste, comunicarse con el área de sistemas.'

  tituloEnConstruccion: string = '¡En construcción!';
  mensajeEnConstruccion: string = 'Funcionalidad en proceso de implementación.';
  mensajeEnvioDetalleVacio: string = 'El Segmento no contiene items de detalle.';
  mensajeEnvioCuentaWhatsApp: string = 'Seleccione cuenta de WhatsApp.';
  mensajeEnvioAsuntoEmail: string = 'SI el envío es Email el Asunto es obligatorio.';

  //#endregion General

  //#region Contacto
  tituloErrorComentario: string = '¡Error en comentario!';
  mensajeErrorComentario: string = 'Debe seleccionar una clasificación y agregar un comentario.';
  tituloErrorInteres: string = '¡Error en intereses de persona!';
  mensajeErrorInteres: string = 'Debe seleccionar una clasificación de intereses y agregar un comentario.';
  tituloErrorSatisfaccion: string = '¡Error en satisfacción de persona!';
  mensajeErrorSatisfaccion: string = 'Debe seleccionar una satisfacción y agregar un comentario.';
  tituloErrorCuentaBancaria: string = '¡Error en cuenta bancaria!';
  mensajeErrorCuentaBancaria: string = 'Debe seleccionar un banco, una moneda e ingresar una cuenta bancaria.';
  tituloErrorEmpresasLabora: string = '¡Error en empresas donde labora!';
  mensajeErrorEmpresasLabora: string = 'Debe ingresar en empresa, cargo, área de trabajo, anexo, teléfono, correo electrónico.';
  tituloErrorComentarioContacto: string = ' ¡Error en comentario persona contacto!';
  mensajeErrorComentarioContacto: string = 'Debe seleccionar una clasificación y agregar un comentario.';
  tituloErrorCuentaBancariaMedico: string = '¡Error en información de cuenta bancaria!'
  mensajeErrorCuentaBancariaMedico: string = 'Debe seleccionar un banco, agregar número de cuenta y seleccionar una moneda.'
  tituloEliminarComentario: string = '¿Esta seguro de eliminar el comentario?';
  mensajeEliminarComentario: string = 'El comentario será eliminado.';
  tituloEliminarInteres: string = '¿Esta seguro de eliminar el interés?';
  mensajeEliminarInteres: string = 'El interés será eliminado.';
  tituloEliminarSatisfaccion: string = '¿Esta seguro de eliminar la satisfacción?';
  mensajeEliminarSatisfaccion: string = 'El satisfacción será eliminado.';
  tituloEliminarCuentaBancaria: string = '¿Esta seguro de eliminar la cuenta bancaria?';
  mensajeEliminarCuentaBancaria: string = 'El cuenta bancaria será eliminado.';
  tituloEliminarEmpresaLabora: string = '¿Esta seguro de eliminar la empresa?';
  mensajeEliminarEmpresaLabora: string = 'El cuenta empresa será eliminado.';
  tituloEliminarEntidadFinanciera: string = '¿Esta seguro de eliminar la cuenta bancaria?';
  mensajeEliminarEntidadFinanciera: string = 'La cuenta bancaria será eliminada.';
  tituloErrorContactoAtencion: string = '¡Error en información de la atención!';
  mensajeErrorContactoAtencion: string = 'Debe seleccionar una ubicación, medio de atención, servicio brindado, detalle servicio y atención producto.';
  tituloEliminarAtencion: string = '¿Esta seguro de eliminar la atención?';
  mensajeEliminarAtencion: string = 'La atención brindada será eliminada.';
  tituloDocumentoYaRegistrado: string = 'El documento ya fue registrado.';
  mensajeDocumentoYaRegistrado: string = 'El número de documento ya ha sido registrado anteriormente.';
  tituloErrorAtencionProducto: string = 'Error en detalle servicio.';
  mensajeErrorAtencionProducto: string = 'Debe seleccionar una de las opciones sugeridas o ingresar un nuevo detalle servicio, presionando ENTER.';
  tituloErrorCargo: string = 'Error en cargo de médico asistente.';
  mensajeErrorCargo: string = 'Debe seleccionar una de las opciones sugeridas o ingresar un nuevo cargo, presionando ENTER.';
  tituloNombreYaRegistrado: string = 'Existen coincidencias ya registradas.';
  mensajeNombreYaRegistrado: string = 'Verifique si el médico ya ha sido registrado anteriormente.';
  //#endregion Contacto  

  //#region Flujo de trabajo
  tituloErrorTipoEnvio: string = '!Error! Tipo de envío';
  mensajeErrorTipoEnvio: string = 'El tipo de envío ya ha sido registrado.';
  tituloErrorActividadSiguiente: string = '!Error! Actividad';
  mensajeErrorActividadSiguiente: string = 'La actividad ya ha sido registrado.';
  tituloEliminarAgente: string = '¿Esta seguro de eliminar el agente?';
  mensajeEliminarAgente: string = 'El agente será eliminado.';
  tituloEliminarCliente: string = '¿Esta seguro de eliminar el cliente?';
  mensajeEliminarCliente: string = 'El cliente será eliminado.';
  tituloEliminarDestino: string = '¿Esta seguro de eliminar el destino?';
  mensajeEliminarDestino: string = 'El cliente será destino.';
  tituloEliminarRegistroActividad: string = '¿Esta seguro de eliminar la Actividad?';
  mensajeEliminarRegistroActividad: string = 'También se eliminarán todas las actividades dependientes.';
  //#endregion Flujo de trabajo  
  //#region Oportunidad
  tituloErrorOportunidadItem: string = 'Agregar producto.';
  mensajeErrorOportunidadItem: string = 'Debe agregar uno o más productos.';
  tituloErrorOportunidadItemVenta: string = '¡Error!.';
  mensajeErrorOportunidadItemVenta: string = 'El producto ya ha sido agregado.';
  tituloErrorOportunidadContacto: string = 'Seleccionar contacto.';
  mensajeErrorOportunidadContacto: string = 'Luego de elegir tipo de oportunidad debe seleccionar a un contacto.';
  mensajeErrorAgente: string = 'Debe seleccionar un nuevo agente.';
  tituloCancelar: string = '¿Está seguro que desea cancelar?';
  tituloQuitarOportunidad: string = '¡Quitar oportunidad!';
  mensajeQuitarOportunidad: string = '¿Seguro de quitar la oportunidad del listado?';
  mensajeVariosAsignados: string = 'La selección contiene distintos agentes asignados.';
  mensajeErrorSeleccionAsesor: string = 'Debe seleccionar un Asesor comercial.'
  mensajeErrorSeleccionActividad: string = 'Debe seleccionar una actividad y programar una fecha.'
  tituloConfirmarFase: string = '¿Seguro de asignar fase venta?'
  mensajeConfirmarFase: string = 'La oportunidad será asignada a la fase venta y actividad.'
  mensajeErrorNota: string = 'Debe agregar contenido a la nota.';
  tituloErrorTipoOportunidad: string = '!Error¡'
  mensajeErrorTipoOportunidad: string = 'Debe seleccionar persona, médico o empresa, para continuar.'
  tituloInfoCitasOportunidad: string = '!Citas¡'
  mensajeInfoCitasOportunidad: string = 'Debe generar el link de pago de las citas.'
  tituloErrorAsignado: string = '!Error en el asesor comercial!';
  MensajeErrorAsignado: string = '<b>No tiene asignado los siguientes productos:</b> <br/>';
  tituloCotizacionAgregada: string = 'Cotización agregada';
  mensajeCotizacionAgregada: string = 'Se agregó la cotización a la oportunidad';
  //#endregion Oportunidad

  //#region Agenda
  mensajeSinRegistros: string = 'No se encontraron registros.'
  mensajeErrorInformacion: string = 'No se pudo obtener la información.'
  mensajeError: string = 'Se produjo un error durante el proceso.'
  tituloErrorDataCompetidor: string = '¡Error en competidor!';
  mensajeErrorDataCompetidor: string = 'Debe seleccionar una clasificación y agregar un comentario.';
  tituloEliminarDataCompetidor: string = '¿Esta seguro de eliminar la información del competidor?';
  mensajeEliminarDataCompetidor: string = 'La información del competidor será eliminado.';
  //#endregion Agenda

  //#region Agenda
  tituloOkSMS: string = '¡SMS Ok!';
  mensajeSuccesSMS: string = 'El mensaje de texto se envió correctamente.';
  tituloOkEmail: string = '¡Email Ok!';
  mensajeSuccesEmail: string = 'El correo electrónico se envió correctamente.';
  tituloOkWhatsApp: string = '¡WhatsApp Ok!';
  mensajeSuccesWhatsApp: string = 'El mensaje por WhatsApp se envió correctamente.';
  tituloErrorOportunidadActividad: string = '¡Error!';
  mensajeErrorOportunidadActividad: string = 'Tiene que elegir una actividad para que sea ejecutada.';
  mensajeErrorSMS: string = 'El número celular no es válido o esta vacío.';
  mensajeErrorEmail: string = 'El email no es válido o esta vacío.';
  mensajeErrorQR: string = 'No se ha escaneado el QR, no se podrá enviar mensajes a WhatsApp.';
  //#endregion Agenda

  //#region Perseus
  tituloErrorPersonal: string = 'El personal no está registrado en Perseus';
  mensajeErrorPersonal: string = 'Revise la lista de personal de Perseus.';
  tituloOkCita: string = '¡Ok!';
  mensajeSuccesCita: string = 'La(s) cita(s) se ha registrado correctamente.';
  tituloErrorCitaContactoAtencion: string = '¡Error!';
  mensajeErrorCitaContactoAtencion: string = 'Solo se puede agregar una cita por contacto atención.';
  mensajeSuccesEdicionCita: string = 'La(s) atención se ha editado correctamente.';
  //#endregion Perseus

  //#region Reglas Asignación
  tituloErrorReglasAsignacion: string = '¡Error!';
  mensajeErrorReglasAsignacion: string = 'El listado no tiene ninguna regla de asignación agregada.';
  //#endregion Reglas Asignación

  //#region Cotizaciones
  mensajeAsosiarOportunidad: string = 'Debe asociar una oportunidad a la cotización.';
  mensajeAgregarProductos: string = 'Debe agregar uno o más productos.';
  mensajeErrorProductoAgregado: string = 'El producto ya ha sido agregado.';
  tituloEliminarProducto: string = '¿Esta seguro de eliminar el producto?';
  mensajeEliminarProducto: string = 'El producto será eliminado.';
  mensajeUnProducto: string = 'La lista debe contener al menos un producto.';
  tituloAdvertencia: string = 'Advertencia';
  mensajeAdvertenciaPrecioAprobado: string = 'Los registros que no fueron modificados se aprobarán con el precio solicitado.';
  mensajeCotizacionPorEditar: string = 'Solo se permite editar cotizaciones en estado "Por Aprobar".';
  mensajeErrorNumeroNegativo: string = 'El valor no puede ser un número negativo.';
  mensajeAsociarOportunidad: string = 'Debe asociar a una oportunidad.';
  mensajeReasignarContacto: string = 'Si modifica el tipo de contacto, los productos serán eliminados.';
  mensajeCotizacionNoAprobada: string = 'La cotización no ha sido aprobada.';
  mensajeAdvertenciaPlantilla: string = 'Debe seleccionar una plantilla.';
  mensajeAdvertenciaWhatsApp: string = 'Ingrese numero de WhatsApp de 9 digitos.';
  tituloCotizacionExistente: string = '¡Existe una cotización por aprobar!';
  mensajeCotizacionExistente: string = 'Los productos serán agregados a la lista y la cotizacion anterior pasará a estado "Cancelado"';
  mensajeErrorGenerarPDF: string = 'Se produjo un error al generar PDF.'
  //#endregion Cotizaciones

  //#region WhatsApp
  tituloPendienteWhatsApp: string = '¡Pendiente!';
  mensajePendienteWhatsApp: string = 'El mensaje esta pendiente para su envío.';
  tituloErrorWhatsApp: string = '¡Error!';
  mensajeErrorWhatsApp: string = 'Error al enviar el mensaje.';
  mensajeErrorProcesoWhatsApp: string = 'Ocurrió un error en el proceso.';
  //#endregion WhatsApp

  //#region PasarelaPago
  descripcionPago = 'Pago por cita';
  tituloCrearLinkPago: string = '¡Crear el link de pago!';
  mensajeCrearLinkPago: string = 'Se va a crear un link de pago para la cita, ¿Desea continuar?.';
  tituloOkLinkPago: string = '¡Ok el link de pago!';
  mensajeOkLinkPago: string = 'El link de pago se creo correctamente y se envió por mensaje WhatsApp al cliente.';
  tituloErrorNumeroOrigen: string = '¡Error número origen!';
  mensajeErrorNumeroOrigen: string = 'No esta configurado para enviar mensajes por WhatsApp .';
  tituloErrorNumeroWhatsApp: string = '¡Error número WhatsApp!';
  tituloErrorRegistradoEmail: string = '¡Error en email!';
  tituloErrorRegistradoNumero: string = '¡Error en número del contacto!';
  mensajeErrorNumeroWhatsApp: string = 'El contacto no tiene configurado el número de WhatsApp.';
  mensajeErrorRegistradoEmail: string = 'El contacto no tiene registrado el email.';
  mensajeErrorRegistradoNumero: string = 'El contacto no tiene registrado el número de contacto.';
  //#endregion PasarelaPago

  //#region Subir archivo
  tituloErrorArchivo: string = '¡Por favor intente de nuevo.!';
  mensajeErrorArchivo: string = '¡Hubo un error en la obtención de la URL!';
  tituloErrorArchivoDisponible: string = '¡El archivo no está disponible.!';
  mensajeErrorArchivoDisponible: string = 'No se encontró un archivo digitalizado válido.';
  tituloInfoGuiaUsuario: string = '¡Seleccionar guia usuario.!';
  mensajeInfoGuiaUsuario: string = 'Por favor, seleccione una guía de usuario.!';
  tituloRegistroDuplicado: string = 'Cancelar actualización';
  mensajeRegistroDuplicado: string = '¿Seguro que no quieres actualizaciones?';
  tituloContactosImportados: string = 'Contactos confirmados';
  mensajeContactosImportados: string = 'Los contactos se están importando, puede ver el estado en los tabs o en la lista al cerrar el modal';
  //#endregion Subir archivo

  //#region Encuesta
  tituloEliminarPregunta: string = '¿Esta seguro de eliminar la pregunta?';
  mensajeEliminarPregunta: string = 'El comentario será eliminado.';
  tituloErrorPregunta: string = '¡Error en la pregunta!';
  mensajeErrorPregunta: string = 'Vuelva a intentarlo';
  tituloNoEditarEncuesta: string = 'No es posible editar todos los campos de la encuesta';
  mensajeNoEditarEncuesta: string = 'La encuesta ya ha iniciado segun la fecha de inicio, solo es posible editar el estado'
  tituloCancelarRespuesta: string = 'Cancelar guardado de respuestas';
  mensajeCancelarRespuesta: string = '¿Está seguro que no desea continuar la encuesta?';
  tituloEliminarPreguntaOpcion: string = '¿Esta seguro de eliminar la opción?';
  mensajeEliminarPreguntaOpcion: string = 'La opción será eliminada.';
  tituloPreguntaOpciones: string = 'Campo(s) en Blaco.';
  mensajePreguntaOpciones: string = '¡Completa las opciones de la pregunta!';
  tituloValorInterno: string = '¡Valor interno.!';
  mensajeVarloInterno: string = 'La opción de valor interno ya existe. Debe ser diferente';
  mensajeReporteEncuesta: string = '¡Debe selecionar una encuesta para el reporte!';
  //#endregion Encuesta

  //#region Llamada Saliente
  mensajeNumeroCelular: string = '¡El numero del celular del contacto es nulo o vacio!';
  mensajeIdContacto: string = '¡El id contacto es nulo o vacio!';
  mensajeIdOportunidad: string = '¡El id oportunidad es nulo o vacio!';
  //#endregion Llamada Saliente

  //#region RedSocial
  avisoTerminos: string = 'La página debe haber aceptado las Condiciones sobre generación de clientes// potenciales de Facebook.';
  //#endregion RedSocial
  //#region Rerportes
  mensajeExportarVacio: string = 'No hay datos para exportar.';
  //#endregion Reportes


  constructor() { }

}
