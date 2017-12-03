export default {
	env: '',
	language: 'en',
    loader:{
        is_loading: false,
        message: '',
    },
    user_last_geolocation: {
        location_granted: false,
        lat: null,
        lng: null,
        time: null
    },
    disable_loader: false,
    fcm_token_mobile: null,
    fcm_token_browser: null
}
