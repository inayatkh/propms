import frappe
import os
import re

def post_install():
    """
    Append the SVG symbol file to the sites/assets/frappe/icons/timeless/icons.svg file.  
    """
    src_path = os.path.join(frappe.get_app_path('propms'), 'public', 'icons', 'propms.svg')
    dest_path = os.path.join(os.path.dirname(frappe.get_site_path()), 'assets', 'frappe', 'icons', 'timeless', 'icons.svg')

    with open(dest_path, 'r+') as f:
        content = f.read()

        # Find the closing </svg> tag.
        m = re.search(r'</svg>', content)
        if m:
            # Append the SVG symbol file to the content.
            content = content[:m.start()] + open(src_path, 'r').read() + content[m.start():]

        f.seek(0)
        f.write(content)
        f.truncate()