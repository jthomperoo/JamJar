/*
Copyright 2019 JamJar Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


class Color {
    public red: number;
    public green: number;
    public blue: number;
    public alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number = 1) {
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
	}
	
	GetTuple(): [number, number, number, number] {
		return [
			this.red,
			this.green,
			this.blue,
			this.alpha
		];
	}
    
    Mix(color: Color) {
		return new Color(
			(color.red + this.red) / 2,
			(color.green + this.green) / 2,
			(color.blue + this.blue) / 2,
			(color.alpha + this.alpha) / 2
		);
	}
}

export default Color;