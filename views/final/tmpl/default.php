<?php $step1 = (isset($_GET['id'])) ? "&id=".$_GET['id'] : ''; ?>
<div id="mainContainer">
<a href='index.php?option=com_mobiconf<?php echo $step1; ?>&task=setup' style='color: #000; text-decoration: underline; font-size: 14px;'>Go Back to Step 2</a><br /><br />

<?php
if ($this->row)
         {
             echo "<h1>".$this->row->title."</h1>";
             $bk = explode('/',$this->row->background);
             if (strpos($background, 'useruploads') !== false) 
             {
                 $bck = $bk[count($bk) - 1];
                unset($bk[count($bk) - 1]);
                $background = implode('/', $bk)."/thumbnails/".$bck;
             }
             else $background = $this->row->background;
             //echo $background;
            echo "<table width='70%'><tr><td valign='top'><b>Background: </b><br /><img src='$background' style='height: 200px;' alt='background' /></td>";
             
         }
         echo '<td valign="top"><p><b>Palette Chosen:</b> '.$this->row_2->palette.'<div id="'.$this->row_2->palette.'" class="colorGradient"></div></td></tr></table>';
         $links = unserialize($this->row_2->links);
         echo "<h3>Links: </h3>";
         foreach($links as $lnk)
         {
             echo "\n<b>Link: <a href='$lnk->url' target='self'>".$lnk->name."</a></b>\n<img style='float: left; ' alt='$lnk->image' src='".JURI::base(). "components/com_mobiconf". DS . "images/".$lnk->image."' />";
             echo "<div style='clear: both;'></div>";
         }
         echo "<form action='".JURI::base()."'>";
         echo "<br /><h2>What Kind of Package Would you Like?</h2>";
         echo "<table style='width: 60%;font-weight: bold; margin: 15px 0px;'>";
         echo "<tr><td><input name='virtuemart_product_id' type='radio' checked value='".$this->product_1->virtuemart_product_id."' />".$this->product_1->product_name."</td>";
         echo "<td><input name='virtuemart_product_id' type='radio' value='".$this->product_2->virtuemart_product_id."' />".$this->product_2->product_name."</td></tr></table>";
?>
<div id="complete">
<p>You have successfully configured your application. Would you like to proceed to checkout?</p>
<input type="hidden" name="option" value="com_virtuemart" />
<input type="hidden" name="view" value="productdetails" />

<input type="submit" value="Accept" />
<input type="button" value="Cancel" onClick='location.href="<?php echo JURI::base();?>"' />
</form>
</div>
</div>
 