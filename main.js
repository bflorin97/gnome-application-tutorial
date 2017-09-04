#!/usr/bin/gjs

const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

var cookies = 0;

const WelcomeToTheGrid = new Lang.Class({
    Name: 'Welcome to the Grid',

    // Create the application itself
    _init: function() {
        this.application = new Gtk.Application();

    // Connect 'activate' and 'startup' signals to the callback functions
    this.application.connect('activate', Lang.bind(this, this._onActivate));
    this.application.connect('startup', Lang.bind(this, this._onStartup));
    },

    // Callback function for 'activate' signal presents windows when active
    _onActivate: function() {
        this._window.present();
    },

    // Callback function for 'startup' signal builds the UI
    _onStartup: function() {
        this._buildUI ();
    },

    // Build the application's UI
    _buildUI: function() {

        // Create the application window
        this._window = new Gtk.ApplicationWindow({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            default_height: 200,
            default_width: 400,
            title: "Click the button to get a cookie!"});

        // Create the Grid
        this._grid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER,
            row_spacing: 20
        });

        this._cookieLabel = new Gtk.Label ({
            label: "Number of cookies: " + cookies
        });

        this._cookiebutton = new Gtk.Button ({
            label: "Get a cookie"
        });

        this._cookiebutton.connect ('clicked', Lang.bind (this, this._getACookie));

        this._switchlabel = new Gtk.Label({
            label: "Cooke dispenser"
        });

        this._cookieswitch = new Gtk.Switch({
            active: true,
        });
        this._cookieswitch.connect ('notify::active', Lang.bind(this, this._cookieDispenser));

        this._grid.attach(this._cookiebutton, 0, 0, 1, 1);
        this._grid.attach(this._switchlabel, 0, 1, 1, 1);
        this._grid.attach(this._cookieswitch, 1, 1, 1, 1);
        this._grid.attach(this._cookieLabel, 0, 2, 1, 1);

        // Add the grid to the window
        this._window.add (this._grid);

        // Show the window and all child widgets
        this._window.show_all();
    },

    _cookieDispenser: function() {

    },

    _getACookie: function() {
        if (this._cookieswitch.get_active()) {
            cookies ++;
            this._cookieLabel.set_label("Number of cookies: " + cookies);
        }
    }

});

// Run the application
let app = new WelcomeToTheGrid ();
app.application.run (ARGV);
