const moment = require('moment');
const fs = require('fs');
const path = require('path');

class Core {
	constructor(){
		this.db = require('./db');
		this.config = {};
	}
	
	async initialize(){
	  this.config = await this.getConfig();
	  
		this.service = require('./service')(this);
		
		return this;
	}
	
	async getConfig(){
		var config = {};
		return new Promise((resolve, reject) => {
			var query = "SELECT * FROM config";
			this.db.query(query).then((results) => {
				for(var i = 0; i < results.length; i++){
					config[results[i].name] = results[i].value;
				}
				resolve(config);
			}).catch((err) => {
				reject(err);
			});
		});
		
		var results = await this.db.query(query);
		for(var cfg of results){
			console.log(cfg);
		}
		for(var i = 0; i < results.length; i++){
			
		}
	}
	
	updateConfig(name, value){
	  var query = 'UPDATE config SET value = "'+value+'" WHERE name = "'+name+'"';
	  return this.db.query(query);
	}
	
	isNumeric(str){
    	if (typeof str != "string") return false;
    	return !isNaN(str) && isNaN(parseInt(str));
    }
	
	normalize(str){
		str = str.replace(/^\s+|\s+$/g, '');
		str = str.toLowerCase();
		
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to   = "aaaaeeeeiiiioooouuuunc------";
		
		for(var i = 0, l = from.length ; i < l ; i++){
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}
		
		str = str.replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
		
		return str;
	}
	
	normalizeName(str){
		str = str.replace(/^\s+|\s+$/g, '');
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to   = "aaaaeeeeiiiioooouuuunc------";
		
		for(var i = 0, l = from.length ; i < l ; i++){
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}
		str = str.replace(/[^a-zA-Z0-9 -]/g, '');
		
		return str;
	}
	
	getEpochTime(){
	  return moment().unix();
	}
	
	getDate(time){
    return moment(time).format("MMM Do 'YY, h:mm a");
	}
  
  async getImages(path=null, fileList=[]){
    try{
    	if(path === null){
				path = '/var/www/ass-races/assets/images/';
			}
			const entries = await fs.promises.readdir(path, { withFileTypes: true });
			
			// Get files within the current directory and add a path key to the file objects
			const files = entries
				.filter(file => !file.isDirectory())
				.map(file => ({ ...file, path: path + file.name }));
			
			// Get folders within the current directory
			const folders = entries.filter(folder => folder.isDirectory());
			
			for(const folder of folders)
				files.push(...await this.getImages(`${path}${folder.name}/`));

    	return files;
    }catch(err){
    	console.log(err);
    }
  }
}

module.exports = new Core();
