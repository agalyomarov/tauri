use tauri::{AppHandle, Listener, Manager, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_dialog;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            // // скрываем окно
            // window.hide().unwrap();

            // показываем UI
            window.show().unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri");
}
